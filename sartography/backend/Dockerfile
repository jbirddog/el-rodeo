FROM ghcr.io/sartography/python:3.11 AS base

ARG FLASK_INSTANCE_PATH

RUN pip install poetry

RUN apt-get update && \
      apt-get install -y -q \
        libpq-dev \
        sqlite3

WORKDIR /app

COPY poetry.lock pyproject.toml README.rst .

# Might as well install dev deps as well so we can run tests?
RUN poetry install --no-root

ENV FLASK_INSTANCE_PATH=$FLASK_INSTANCE_PATH

# For now bin is expected as a volume
CMD ["./bin/boot.sh"]
