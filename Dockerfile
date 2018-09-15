FROM python:3.7 as python

ENV PYTHONUNBUFFERED 1

RUN pip install pipenv
COPY ./Pipfile ./Pipfile.lock /app/
WORKDIR /app
RUN pipenv install --system --deploy

COPY . /app/

COPY ./start.sh start.sh
EXPOSE 5000
CMD ["./start.sh"]
