FROM python:alpine AS base

RUN pip install poetry

RUN apk add -U \
      cargo \
      gcc \
      git \
      musl-dev \
      postgresql-dev \
      postgresql-libs \
      rust

WORKDIR /app

COPY poetry.lock pyproject.toml .
#RUN poetry export \
#      --without-hashes \
#      --without=dev \
#      --format=requirements.txt > requirements.txt

RUN poetry install --without dev
#RUN pip install -r requirements.txt
