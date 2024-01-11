import os
from app.db.session import SessionLocal
from app.models.video import Video
from app.models.full_script import FullScript
from app.models.summary_script import SummaryScript
from elasticsearch import Elasticsearch
from utils.gpt import get_embedding

ELASTIC_SEARCH_URL = os.getenv("ELASTIC_SEARCH_URL")
es = Elasticsearch(ELASTIC_SEARCH_URL)

# 질문 하고 싶은 문장에 대한 임베딩
query_vector = get_embedding("Respond to the COVID-19")

# cosine 쿼리 정의
cosine_query = {
    "query": {
        "script_score": {
            "query": {"match_all": {}},
            "script": {
                "source": "cosineSimilarity(params.query_vector, 'embedded_vector') + 1.0",
                "params": {"query_vector": query_vector},
            },
        }
    }
}

result = es.search(index="vector_index", query=cosine_query["query"])

for x in result["hits"]["hits"]:
    print()
    print(x["_source"]["search_data"]["summaryScript"]["contents"]["en"])
