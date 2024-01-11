from elasticsearch import Elasticsearch
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
import os

from app.db.session import get_db
from app.models import *
from app.services.video_service import *
from app.services.summary_script_service import *
from app.services.full_script_service import *
from app.schemas.response_dto import ResponseDto
from app.schemas.error_dto import ErrorDto
from app.services.search_service import *
from utils.cosine_query import create_cosine_query
from utils.embedding import query_to_vector

ELASTIC_SEARCH_URL = os.getenv("ELASTIC_SEARCH_URL")
es = Elasticsearch(ELASTIC_SEARCH_URL)


router = APIRouter()


@router.get("/search")
def get_search_list(query: str, db: Session = Depends(get_db)):
    query_vector = query_to_vector(query)
    cosine_query = create_cosine_query(query_vector)

    search_datas = []
    results = es.search(index="vector_index", query=cosine_query["query"])
    for x in results["hits"]["hits"]:
        search_datas.append(x["_source"]["search_data"])

    return {"data": search_datas}


@router.get("/v2/search")
def get_search_list_v2(query: str, db: Session = Depends(get_db)):
    query_vector = query_to_vector(query)
    cosine_query = create_cosine_query(query_vector)

    search_datas = []
    results = es.search(index="vector_index", query=cosine_query["query"])
    for x in results["hits"]["hits"]:
        search_data = x["_source"]["search_data"]
        search_data["searchId"] = x["_id"]
        search_datas.append(search_data)

    return {"data": search_datas}


@router.get("/v3/search")
def get_search_list_v3(query: str, pageParam: int = 0):
    if pageParam >= 1000:
        return JSONResponse(
            status_code=404,
            content=ErrorDto(
                code="e006001",
                message="요청된 pageParam이 너무 큽니다. pageParam은 1000보다 작아야 합니다.",
                data=None,
            ).dict(),
        )

    query_vector = query_to_vector(query)
    cosine_query = create_cosine_query(query_vector)
    results = es.search(
        index="vector_index",
        query=cosine_query["query"],
        min_score=1.70,
        size=10,
        from_=pageParam * 10,
    )

    return ResponseDto(
        code="s006001",
        message="성공적으로 검색결과를 가져왔습니다.",
        data=es_result_to_searchdata(results, pageParam),
    )
