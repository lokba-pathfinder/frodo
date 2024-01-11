"""
    query vector를 입력받아 elastic search에 사용가능한 cosine query vector로 반환합니다.

"""


def create_cosine_query(query_vector):
    return {
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
