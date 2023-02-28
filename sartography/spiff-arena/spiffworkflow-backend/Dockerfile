FROM ghcr.io/sartography/python:3.11 AS base

RUN pip install poetry

RUN apt-get update && \
      apt-get install -y -q \
        libpq-dev

WORKDIR /app

COPY poetry.lock pyproject.toml .

RUN poetry install --without dev --no-root

COPY src/ src/
COPY migrations/ migrations/
COPY README.rst .

RUN poetry install --only=root

CMD poetry run flask run
