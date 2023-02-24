FROM python:alpine AS base

RUN apk add -U make

WORKDIR /app

COPY requirements.txt setup.py README.md .
RUN pip3 install -r requirements.txt
RUN pip3 install unittest-parallel

COPY SpiffWorkflow/ SpiffWorkflow/
COPY doc/ doc/
COPY tests/ tests/
COPY Makefile .

FROM base as tests
RUN make tests

FROM base as tests-par
RUN make tests-par
