USER_ID ?= $(shell id -u)
GROUP_ID ?= $(shell id -g)
ME ?= $(USER_ID):$(GROUP_ID)

all: build compile

build:
	docker build -t el-rodeo .

compile:
	docker run --rm -u $(ME) -v .:/app el-rodeo \
		clang \
		--target=wasm32 \
		--no-standard-libraries \
		-Wl,--no-entry \
		-Wl,--export-all \
		-o add.wasm \
		add.c

start:
	python -m http.server

.PHONY: build compile start
