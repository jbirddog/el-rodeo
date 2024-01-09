FROM python:alpine AS base

ARG FLASK_INSTANCE_PATH

RUN pip install -U pip poetry

RUN apk add -U sqlite

# RUN \
#     --mount=type=cache,target=/var/cache/apt \
#     apt-get update && \
#       apt-get install -y -q \
#         libpq-dev \
#         sqlite3

WORKDIR /app

COPY poetry.lock pyproject.toml README.rst .

RUN \
    --mount=type=cache,target=/var/cache/poetry \
    poetry install --no-root

ENV FLASK_INSTANCE_PATH=$FLASK_INSTANCE_PATH

# For now bin is expected as a volume
CMD ["./bin/boot.sh"]

