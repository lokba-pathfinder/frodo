# 프로젝트 구조

## 데이터전처리
### 독립적인 Data-server에서 데이터 전처리 및 데이터베이스에 입력을 진행합니다.
<img width="700" alt="Untitled (3)" src="https://github.com/brain-pathfinder/frodo/assets/137985062/055fb64d-65e3-4846-87d6-c40195e3cadb">

## 메인서버
### 메인서비스를 수행합니다.
<img width="561" alt="image" src="https://github.com/brain-pathfinder/frodo/assets/137984535/e3c7747a-8611-48b7-a42a-ed0ffaf5a27f">


## Database Schema
<img width="500" alt="DB스키마" src="https://github.com/brain-pathfinder/frodo/assets/137985062/bf29e323-7a53-4b85-879c-fcaa36604814">

# 핵심 기술
## 기술
* 전처리와 Prompt엔지니어링을 통한 원문 참조 가능한 요약본 제공
* Whisper를 이용한 불완전한 Script 처리
* Elastic Search를 이용한 검색속도 향상

## 핵심 라이브러리
* FastAPI : main server
* Openai.ChatCompletion : summary
* Openai.Whisper : script refinement
* Pytube : video download for Whisper
* YouTubeTranscriptApi : script extraction
* Selenium : crawling
* Elasticsearch : search query



# 실행 방법
⚠️ 모든 명령어는 현재 디렉토리 /frodo/backend 기준으로 실행되어야 합니다.
## 파이썬 버전

```
Python 3.11
```


### 가상환경 실행
필요한 패키지는 pipenv로 관리하였습니다.
```
pipenv install
pipenv shell
```

### 데이터 크롤링 리스트
```
data_preparation/playlist_crawling.ipynb에서 원하는 url을 입력하여 실행합니다.
```

### 데이터 입력
```
# video id 입력
python -m data_preparation.insert_video -i {video_id}
# video id 리스트 입력
python -m data_preparation.insert_video_list -s {video_id_list}.txt
```

### Elasticsearch 초기화 및 업데이트
DB에서 데이터를 받아와 Elasticsearch를 이용한 검색이 가능하도록 합니다.
```
# 초기화
python  -m data_preparation.update_elasticsearch --init
# 업데이트
python  -m data_preparation.update_elasticsearch --update
```

### 백엔드 서버 실행
api 호출 및 검증을 위해 백앤드 서버를 띄우는 방법입니다.
```
uvicorn app.main:app --reload
```
