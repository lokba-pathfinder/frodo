def similarity_to_score(simiarty_score: float):
    score = 70 + int((simiarty_score - 1.7) * 100)
    if score < 75:
        return (score, "low")
    elif score < 85:
        return (score, "medium")
    else:
        return (score, "high")


def es_result_to_searchdata(es_results, page_param):
    has_next = True
    if (
        not es_results["hits"]["hits"]
        or (page_param + 1) * 10 > es_results["hits"]["total"]["value"]
    ):
        has_next = False

    search_data_list = []
    for x in es_results["hits"]["hits"]:
        search_data = x["_source"]["search_data"]
        search_data["searchId"] = x["_id"]
        search_data["score"], search_data["grade"] = similarity_to_score(x["_score"])

        search_data_list.append(search_data)

    return {
        "hasNext": has_next,
        "pageParam": page_param,
        "total": es_results["hits"]["total"]["value"],
        "searchDataList": search_data_list,
    }
