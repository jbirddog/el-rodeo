FROM debian:bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y -q curl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN curl -L -o wasi-sdk.tar.gz \
    https://github.com/WebAssembly/wasi-sdk/releases/download/wasi-sdk-24/wasi-sdk-24.0-x86_64-linux.tar.gz \
  && mkdir /opt/wasmer \
  && tar -xf wasi-sdk.tar.gz -C /opt/wasmer \
  && rm wasi-sdk.tar.gz

RUN echo 'PATH=/opt/wasmer/wasi-sdk-24.0-x86_64-linux/bin:$PATH' >> /etc/profile

ENV PATH=/opt/wasmer/wasi-sdk-24.0-x86_64-linux/bin:$PATH
