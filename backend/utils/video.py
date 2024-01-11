"""
    Video 와 관련된 모든 모듈을 제공합니다.
"""

from pytube import YouTube
from copy import deepcopy
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options


def get_channel_info(video_url: str) -> list:
    """
        crawling channel_name, channel_image_url from video_url

    Args:
        video_url (str): video_url

    Returns:
        list: list of str
            [channel_name, channel_image_url]

    """
    # setting option for web driver
    options = Options()
    options.add_argument("headless")
    options.add_argument("window-size=1920x1080")

    # setting web driver
    driver = webdriver.Chrome(options=options)

    # move to the url page
    driver.get(video_url)

    # wait for the page loaded
    wait = WebDriverWait(driver, 30)

    try:
        # crawl the channel image url
        img_element = wait.until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, "img#img.style-scope.yt-img-shadow")
            )
        )
        channel_image_url = img_element.get_attribute("src")

        # crawl the channel name
        text_element = wait.until(
            EC.presence_of_element_located(
                (
                    By.CSS_SELECTOR,
                    "#text-container .yt-simple-endpoint.style-scope.yt-formatted-string",
                )
            )
        )
        channel_name = text_element.text

    except:
        print("Image not found!")
    finally:
        driver.quit()

    return [channel_name, channel_image_url]


def get_video_info(video_id: str, url_type="youtube") -> dict:
    """
        video_id's information with aligned with Database

    Args:
        video_id (str): video_id
        url_type (str, optional): type of url site. Defaults to "youtube".

    Returns:
        dict: information of video_id
    """

    # Our product, now, only focuses on the youtube video.
    if url_type == "youtube":
        url = "https://www.youtube.com/watch?v=" + video_id
    else:
        print("Error:unknown url type")
        return

    info = YouTube(url)

    # basic information about the youtube video
    ret_dict = {}
    ret_dict["url_type"] = url_type
    ret_dict["url_key"] = video_id
    ret_dict["title"] = info.title
    ret_dict["image_url"] = info.thumbnail_url
    ret_dict["total_time"] = info.length
    ret_dict["view_count"] = info.views
    ret_dict["published_at"] = info.publish_date

    # additional information about the channel, which needs crawling
    channel_name, channel_image_url = get_channel_info(url)
    ret_dict["channel_name"] = channel_name
    ret_dict["channel_image_url"] = channel_image_url

    return ret_dict
