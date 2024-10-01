USER_ID ?= $(shell id -u)
GROUP_ID ?= $(shell id -g)
ME ?= $(USER_ID):$(GROUP_ID)

IMG ?= node:slim
RUN ?= docker run -it --rm -u $(ME) -p 3000:3000 -v .:/usr/src/app -w /usr/src/app $(IMG)

i:
	$(RUN) npm i

dev:
	$(RUN) npm run dev

edge-build:
	$(RUN) npm run edge:build

.PHONY: i dev edge-build
