FROM python:alpine AS build

RUN python -m pip install --upgrade pip
RUN pip install poetry

RUN apk add -U \
    gcc \
    git \
    musl-dev \
    postgresql-dev \
    postgresql-libs

COPY spiffworkflow-backend/poetry.lock \
     spiffworkflow-backend/pyproject.toml \
     .

RUN poetry export \
    --without-hashes \
    -f requirements.txt \
    -o requirements.txt

RUN pip install \
    --no-cache-dir \
    -r requirements.txt

FROM python:alpine AS base

ARG sitepackages=/usr/local/lib/python3.11/site-packages
COPY --from=build $sitepackages $sitepackages

WORKDIR /app
