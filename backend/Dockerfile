FROM python:3.11

COPY . /app 
WORKDIR /app

RUN pip install pipenv

RUN pipenv install --system --deploy --ignore-pipfile

CMD uvicorn app.main:app --app-dir ./ --host=0.0.0.0 --port 8000
