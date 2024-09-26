FROM ghcr.io/sartography/python:3.11 AS base

RUN pip install poetry

RUN apt-get update -q && apt-get install -y -q libpq-dev

WORKDIR /app

COPY poetry.lock pyproject.toml .
COPY connectors/ connectors/

RUN poetry install --without dev

COPY app.py config.py .

CMD ["poetry", "run", "flask", "run", "--host=0.0.0.0"]
