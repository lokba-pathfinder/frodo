"""
    임베딩에 관련된 모듈 입니다.
"""
from utils.gpt import get_embedding_vector_list, get_embedding
from utils.translate import ko_to_en
from langdetect import detect
import pandas as pd


def add_embedding_vector(summary_script: list, video_data: dict) -> None:
    """
        Execute embedding and insert embeddings into summary_script

    Args:
        summary_script (list): summary_script
    """

    script_df = pd.DataFrame(summary_script)
    title = video_data["title"]
    for scr in summary_script:
        scr["combined"] = f"Title : {title} \n {scr['content-en']}"

    script_df = pd.DataFrame(summary_script)
    embeddings = get_embedding_vector_list(script_df)

    for i, script in enumerate(summary_script):
        script["embeddings"] = embeddings[i]

    print("Done: embedding complete")
    return


def query_to_vector(search_query: str) -> list:
    """
    언어를 탐지하고, 한글 query인 경우, 영어로 변환 후 embedding을 진행합니다.
    """
    is_korean = False
    try:
        is_korean = detect(search_query) == "ko"
    except:
        pass

    if is_korean:
        return get_embedding(ko_to_en(search_query))
    return get_embedding(search_query)
