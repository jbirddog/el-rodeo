FROM python:alpine AS build

RUN python -m pip install --upgrade pip
RUN pip install poetry

RUN apk add -U \
    gcc \
    git \
    musl-dev \
    postgresql-dev \
    postgresql-libs

COPY poetry.lock pyproject.toml .

RUN poetry export \
    --without-hashes \
    -f requirements.txt \
    -o requirements.txt

RUN pip install -r requirements.txt

RUN poetry export \
    -C spiffworkflow-backend \
    --without-hashes \
    -f requirements.txt \
    -o requirements.txt
    
RUN pip install -r requirements.txt

FROM python:alpine AS base

COPY --from=build /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

WORKDIR /app