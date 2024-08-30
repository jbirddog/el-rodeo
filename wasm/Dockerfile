FROM python:3.11-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y -q binutils patchelf \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir py2wasm

COPY test.py test.py

RUN py2wasm test.py -o test.wasm

