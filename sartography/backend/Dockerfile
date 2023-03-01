FROM ghcr.io/sartography/python:3.11 AS base

RUN pip install poetry

RUN apt-get update && \
      apt-get install -y -q \
        libpq-dev

WORKDIR /app

COPY poetry.lock pyproject.toml .

# Might as well install dev deps as well so we can run tests?
RUN poetry install --without dev --no-root

# Get from ARG
#RUN mkdir -p local/instance

# For now bin is expected as a volume
CMD ["./bin/boot.sh"]
