all: build compile

build:
	docker build -t el-rodeo .

compile:
	docker run -v .:/app el-rodeo clang \
		--target=wasm32 \
		--no-standard-libraries \
		-Wl,--no-entry \
		-o add.wasm \
		add.c
