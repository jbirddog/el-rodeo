FROM python:3.11-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y -q clang lld \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*


