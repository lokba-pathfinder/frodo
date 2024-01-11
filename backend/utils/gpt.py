"""
    openai api를 사용하는 모든 함수를 지정합니다.

"""
import os
import openai
import pandas as pd
from openai.embeddings_utils import cosine_similarity
from typing import IO


def initialize(mykey: bool) -> None:
    """
    initialize openai setting for GPT.

    Args:
        key (bool): Whether to use personal key for openai initialize.
    """

    if mykey:
        openai.api_key = os.getenv("MY_OPENAI_KEY")
        return

    openai.api_type = "azure"
    openai.api_base = os.getenv("AZURE_OPENAI_ENDPOINT")
    openai.api_key = os.getenv("AZURE_OPENAI_KEY")
    openai.api_version = "2023-05-15"
    print("Done: openai API Initialization")
    return


# currently, we only use the personal api key for gpt-3.5-16k
initialize(True)


def refine_query(audio_file: IO[bytes], video_title: str) -> list:
    """
    send whisper api to get refined scripts

    Args:
        audio_file (IO[bytes]): opend audio file
        video_title (str): video's title to use it for the prompt

    """

    return openai.Audio.translate(
        "whisper-1",
        audio_file,
        response_format="verbose_json",
        # prompt=f"Insert punctuation marks.",
    )


def summary_query(query_script: str, my_key=True) -> list:
    """execute summary query

    Args:
        query_script (list): full script to be summarized
        my_key (bool): whether to use personal key or not

    Returns:
        list of raw summary
    """

    query = """
    You are a note taker. can you summarize the text I will give you while following the below rules?
    1. split lines by meaningful chunks and summary them.
    2. mark which lines are included at the summary

    The template I hope to see.

    Title(lines from to)
    * contents
    * contents
    ....
    Title2(lines from to)
    * contents
    * contents
    Title3(lines from to)
    * contents
    * contents

    Here is the example part of the summary.

    Example of Pizza store (lines 15-24)
    * Pizza store makes a lot of data, but there is no way to use it.
    * By using AI, it is possible to predict the future demand based on the previous data.
    * Small business is able to get greate gain when using AI, but the fact that each business needs individual solution makes it hard.

    """

    ans = "Of course, I can help with that."

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        temperature=0,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": query},
            {"role": "assistant", "content": ans},
            {"role": "user", "content": query_script},
        ],
    )

    print("creating raw summary ...")
    return response["choices"][0]["message"]["content"]


def get_embedding(text: str) -> list:
    """
        given query, calculate and return embedding vector

    Args:
        text (str): query

    Returns:
        list: embedding vector from query
    """
    model = "text-embedding-ada-002"
    return openai.Embedding.create(input=[text], model=model)["data"][0]["embedding"]


def get_embedding_vector_list(script_df: pd.DataFrame) -> list:
    """
        given dataframe, return embedding vector list of each row

    Args:
        script_df (pd.DataFrame): dataframe which has "combined" column

    Returns:
        list: embedding vector list
    """

    script_df["embedding"] = script_df.combined.apply(lambda x: get_embedding(x))
    return script_df["embedding"].tolist()
