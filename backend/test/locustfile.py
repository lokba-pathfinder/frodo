"""
    Locust를 이용한 백엔드부하테스트를 위해 Locust의 유저 시나리오 설정을 하는 파일입니다.
    
"""

from locust import HttpUser, task, between
import random

# Load video_list from a file
with open("video_list.txt", "r") as f:
    video_list = [line.strip() for line in f.readlines() if line.strip() != ""]


class WebsiteUser(HttpUser):
    wait_time = between(1, 3)  # wait between 1 and 3 seconds after each task

    @task
    def index(self):
        # main page
        self.client.get("/")

    @task(2)
    def search_page(self):
        # search query is random words with 5-15 lengths
        search_length = random.randrange(5, 15)
        search_query = "".join(
            chr(random.randrange(0x61, 0x7A)) for _ in range(search_length)
        )
        self.client.get(f"/search?query={search_query}")

    @task(2)
    def detail_page(self):
        # Select a random video_id from video_list
        video_id = random.choice(video_list)

        # API calls for the video
        self.client.get(f"/full-scripts/{video_id}")  # Changed `videoId` to `video_id`
        self.client.get(
            f"/summary-scripts/{video_id}"
        )  # Changed `videoId` to `video_id`
