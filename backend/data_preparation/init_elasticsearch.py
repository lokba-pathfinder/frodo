import os, time
from elasticsearch import Elasticsearch
from sqlalchemy.orm import joinedload
from app.db.session import SessionLocal
from app.models.full_script import FullScript
from app.models.summary_script import SummaryScript
from app.models.video import Video

# es 서버와 연결
ELASTIC_SEARCH_URL = os.getenv("ELASTIC_SEARCH_URL")
es = Elasticsearch(ELASTIC_SEARCH_URL)

# index = DB에서의 테이블
# 기존에 index가 있다면 삭제하도록
# "vector_index" 라는 인덱스를 삭제
es.indices.delete(index="vector_index")

# "vector_index"라는 index에 대한 정의
index_config = {
    "settings": {"number_of_shards": 1, "number_of_replicas": 0},
    "mappings": {
        "properties": {
            "id": {"type": "keyword"},
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


def fetch_summary_scripts(start_id, end_id):
    db = SessionLocal()
    try:
        summary_scripts = (
            db.query(SummaryScript)
            .options(
                joinedload(SummaryScript.video), joinedload(SummaryScript.full_scripts)
            )
            .filter(SummaryScript.id > start_id)
            .filter(SummaryScript.id <= end_id)
            .all()
        )
    finally:
        db.close()

    # 결과를 JSON 형식으로 변환
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


db = SessionLocal()
try:
    last_id = db.query(SummaryScript.id).order_by(SummaryScript.id.desc()).first()[0]
finally:
    db.close()


div, mod = divmod(last_id, 50)
start_time = time.time()


# db에서 fetch 후 집어 넣는 부분
for i in range(50):
    results = fetch_summary_scripts(start_id=i * div, end_id=(i + 1) * div)
    for result in results:
        res = es.index(index="vector_index", document=result)
    print("Done : %d/51" % (i + 1))

results = fetch_summary_scripts((i + 1) * div, last_id)
for result in results:
    res = es.index(index="vector_index", document=result)
print("Done : 51/51")


end_time = time.time()
print("실행 시간:", end_time - start_time, "초")
