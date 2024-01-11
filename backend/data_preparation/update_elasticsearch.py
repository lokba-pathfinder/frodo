import argparse
import os, time
import sys
from elasticsearch import Elasticsearch
from sqlalchemy.orm import joinedload
from app.db.session import SessionLocal
from app.models.full_script import FullScript
from app.models.summary_script import SummaryScript
from app.models.video import Video


def create_index():
    """
    index 테이블을 초기화 합니다.
    """
    ELASTIC_SEARCH_URL = os.getenv("ELASTIC_SEARCH_URL")
    es = Elasticsearch(ELASTIC_SEARCH_URL)

    # "vector_index"가 존재한다면 기존 인덱스를 삭제
    if es.indices.exists(index="vector_index"):
        es.indices.delete(index="vector_index")

    # "vector_index"라는 index에 대한 정의
    index_config = {
        "settings": {"number_of_shards": 1, "number_of_replicas": 0},
        "mappings": {
            "properties": {
                "id": {"type": "keyword"},
                "summary_pk": {"type": "integer"},
                "embedded_vector": {
                    "type": "dense_vector",
                    "dims": 1536,
                    "index": True,
                    "similarity": "cosine",
                },
                "search_data": {
                    "type": "object",
                    "enabled": False,  # 이 필드는 검색에서 제외됩니다.
                },
            }
        },
    }

    # es에 정의기반으로 인덱스를 생성을 요청
    es.indices.create(
        index="vector_index",
        settings=index_config.get("settings"),
        mappings=index_config.get("mappings"),
    )


def get_init_range():
    """
    init 시에 elasticsearch로 추가 할 데이터의 시작과 끝 부분을 찾습니다.
    """
    start_id = 0
    db = SessionLocal()
    try:
        end_id = db.query(SummaryScript.id).order_by(SummaryScript.id.desc()).first()[0]
    except:
        print("db에 추가할 데이터가 없습니다.")
        sys.exit()
    finally:
        db.close()

    return start_id, end_id


def get_update_range():
    """
    update 시에 elasticsearch로 추가 할 데이터의 시작과 끝 부분을 찾습니다.
    기존에 elasticsearch에 있던 비디오의 가장 마지막 summary_script id가 시작 지점입니다.
    """
    ELASTIC_SEARCH_URL = os.getenv("ELASTIC_SEARCH_URL")
    es = Elasticsearch(ELASTIC_SEARCH_URL)

    # ES에 있는 video_pk 중 가장 큰 값을 가져온 뒤
    # DB에서 그 video의 요약 정보들 중 가장 마지막 값, 즉 summary_script_id가 가장 큰 값을 찾습니다.
    # 그 값 이후의 summary_script_id가 부터가 ES에 추가되어야 할 값들 입니다.
    body = {"size": 1, "sort": [{"summary_pk": {"order": "desc"}}]}
    res = es.search(index="vector_index", body=body)
    if res["hits"]["hits"]:
        last_summary_pk = res["hits"]["hits"][0]["_source"]["summary_pk"]
    db = SessionLocal()
    try:
        start_id = (
            db.query(SummaryScript.id)
            .filter(SummaryScript.id == last_summary_pk)
            .first()[0]
        )
    except:
        print("Elatsticsearch에 기존에 데이터 없습니다. --init 옵션을 실행해주세요")
        sys.exit()
    finally:
        db.close()

    db = SessionLocal()
    try:
        end_id = db.query(SummaryScript.id).order_by(SummaryScript.id.desc()).first()[0]
    finally:
        db.close()

    return start_id, end_id


def fetch_summary_scripts(start_id, end_id):
    """
    summary_script의 id가 start_id 초과 end_id 이하의 값인 데이터에 대해서,
    검색 결과를 미리 만들어 Elasticsearch에 들어갈 형식으로 반환합니다.

    Args:
        start_id (int): (추가가 시작 될 summary_script의 id)-1
        end_id (int): (추가가 끝날 summary_script의 id)
    """

    # DB로부터 summary_scripts를 조건에 맞게 가져옵니다.
    db = SessionLocal()
    try:
        summary_scripts = (
            db.query(SummaryScript)
            .options(
                joinedload(SummaryScript.video), joinedload(SummaryScript.full_scripts)
            )
            .filter(SummaryScript.id > start_id)
            .filter(SummaryScript.id <= end_id)
            .order_by(SummaryScript.id)
            .all()
        )
    finally:
        db.close()

    # 가져온 summary_scripts를 Elasticsearch index 구조에 맞춰서 results를 구성합니다.
    results = []
    for summary_script in summary_scripts:
        en_splited = summary_script.content_en.rstrip("\n").split("\n")
        en_title = (en_splited[0].split("(lines"))[0]
        en_lines = [x.strip("*" " ") for x in en_splited[1:]]

        ko_splited = summary_script.content_ko.rstrip("\n").split("\n")
        ko_title = (ko_splited[0].split("(lines"))[0]
        ko_lines = [x.strip("*" " ") for x in ko_splited[1:]]

        try:
            result = {
                "embedded_vector": summary_script.embedded_vector,
                "summary_pk": summary_script.id,
                "search_data": {
                    "media": "youtube",
                    "videoId": summary_script.video.url_key,
                    "imageUrl": summary_script.video.image_url,
                    "startTime": summary_script.full_scripts[0].start_time,
                    "totalTime": summary_script.video.total_time,
                    "fullScriptId": summary_script.video.url_key
                    + "-full-"
                    + str(summary_script.start_id),
                    "viewCount": summary_script.video.view_count,
                    "publishedAt": summary_script.video.published_at,
                    "channelImageUrl": summary_script.video.channel_image_url,
                    "channelTitle": summary_script.video.channel_name,
                    "title": summary_script.video.title,
                    "summaryScript": {
                        "id": summary_script.video.url_key
                        + "-sum-"
                        + str(summary_script.id),
                        "videoId": summary_script.video.url_key,
                        "contents": {
                            "en": {"title": en_title, "lines": en_lines},
                            "ko": {"title": ko_title, "lines": ko_lines},
                        },
                        "fullScriptIds": [],
                        "startTime": summary_script.full_scripts[0].start_time,
                    },
                },
            }
            results.append(result)
        except:
            print("video error : ", summary_script.id)

    return results


def push_to_elasticsearch(start_id, end_id):
    """
    전체 범위에 대해서 51번으로 나눠서 fetch_summary_scripts가 실행되고
    그 데이터가 elsaticsearch로 추가 될 수 있도록 합니다.
    """
    print("start summary scirpt id :", start_id)
    print("end summary scirpt id :", end_id)

    div, mod = divmod(end_id - start_id, 50)

    ELASTIC_SEARCH_URL = os.getenv("ELASTIC_SEARCH_URL")
    es = Elasticsearch(ELASTIC_SEARCH_URL)

    for i in range(50):
        results = fetch_summary_scripts(
            start_id=start_id + i * div, end_id=start_id + (i + 1) * div
        )
        for result in results:
            res = es.index(index="vector_index", document=result)
        print("Done : %d/51" % (i + 1))

    results = fetch_summary_scripts(start_id + (i + 1) * div, end_id)
    for result in results:
        res = es.index(index="vector_index", document=result)
    print("Done : 51/51")


def main():
    parser = argparse.ArgumentParser(description="update or init.")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--update", action="store_true", help="Update Elasticsearch")
    group.add_argument("--init", action="store_true", help="Initialize Elasticsearch")

    args = parser.parse_args()

    start_time = time.time()  # 시작 시간 체크

    if args.update:
        start_id, end_id = get_update_range()

        if start_id == end_id:
            print("Nothing to update Elasticsearch...")
        else:
            print("Updating Elasticsearch...")
            push_to_elasticsearch(start_id, end_id)

    elif args.init:
        create_index()
        start_id, end_id = get_init_range()

        print("Initializing Elasticsearch...")
        push_to_elasticsearch(start_id, end_id)

    end_time = time.time()

    elapsed_time = end_time - start_time
    print(f"Total elapsed time: {elapsed_time:.2f} seconds")

    return None


if __name__ == "__main__":
    main()
