"""
    번역과 관련된 모듈을 관리합니다.
"""
from copy import deepcopy
import googletrans

translator = googletrans.Translator()


def full_scripts_add_ko(full_scripts: list) -> None:
    """
    full scripts를 한글로 번역하고, 해당 데이터에 content-ko를 추가합니다.

    Args:
        full_scripts (list): list form of full scripts
    """

    # to avoid api time limit issue, translate by chunk_size of lines.
    chunk_size = 30
    full_scripts_translated = []

    # translate by each chunk and assign 'content-ko' to full scripts
    for i in range(0, len(full_scripts), chunk_size):
        start = i
        end = min(i + chunk_size, len(full_scripts) - 1)
        chunk = full_scripts[start]["content-en"]
        for idx in range(start + 1, end):
            chunk += "\n" + full_scripts[idx]["content-en"]

        ko_lines = translator.translate(chunk, dest="ko", src="en").text.split("\n")
        for idx in range(start, end):
            full_scripts[idx]["content-ko"] = ko_lines[idx - start]


def summary_scripts_add_ko(summary_scripts: list) -> None:
    """
    summary scripts를 한글로 번역하고, 해당 데이터에 content-ko를 추가합니다.
    각각의 sumamry script 맨 윗 줄의 line은 나중에 전처리를 위해 건드리면 안 됩니다.

    Args:
        summary_scripts (list): list form of summary scripts

    """

    # need to handle this kind of explicit lines -> (lines 1-24)
    for scr in summary_scripts:
        # detach line annotation
        start_line, end_line = map(
            int, scr["content-en"].split("\n")[0].split("(lines")[-1][:-1].split("-")
        )

        to_replace = f"(lines {start_line}-{end_line})"
        to_translate = scr["content-en"].replace(to_replace, "")

        # translate from english to korean
        ko_summary = translator.translate(to_translate, dest="ko", src="en").text

        # attach line annotation
        temp_script = ko_summary.split("\n")
        temp_script[0] += " " + to_replace

        # add "content-ko"
        scr["content-ko"] = "\n".join(temp_script)


def ko_to_en(input_line: str) -> str:
    """
    한글 라인을 입력받으면, 영어 라인으로 반환합니다.
    """
    return translator.translate(input_line, dest="en", src="ko").text
