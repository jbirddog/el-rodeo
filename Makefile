ME := $(shell id -u):$(shell id -g)

.PHONY: pull-images
pull-images:
	docker pull ghcr.io/sartography/spiffworkflow-frontend:main-latest

.PHONY : spiffworkflow-tests
spiffworkflow-tests:
	docker build \
		-f sartography/SpiffWorkflow/tests.Dockerfile \
		-t spiffworkflow-tests \
		--target tests \
		../../sartography/SpiffWorkflow

.PHONY : spiffworkflow-tests-par
spiffworkflow-tests-par:
	docker build \
		-f sartography/SpiffWorkflow/tests.Dockerfile \
		-t spiffworkflow-tests \
		--target tests-par \
		../../sartography/SpiffWorkflow

.PHONY : spiffworklow-frontend-main-latest
frontend-main-latest:
	docker compose \
		-f docker-compose.yml \
		-f sartography/frontend/main-latest.docker-compose.yml \
		up spiffworkflow-frontend

.PHONY : pull-spiffworklow-frontend-main-latest
pull-frontend-main-latest:
	docker compose \
		-f docker-compose.yml \
		-f sartography/frontend/main-latest.docker-compose.yml \
		pull spiffworkflow-frontend

.PHONY : backend-sqlite
backend-sqlite:
	docker compose \
		-f docker-compose.yml \
		-f sartography/frontend/main-latest.docker-compose.yml \
		-f sartography/backend/sqlite.docker-compose.yml \
		up --build spiffworkflow-backend

.PHONY : status-proxy
status-proxy:
	docker compose \
		-f docker-compose.yml \
		-f sartography/connector-proxy-status-im/docker-compose.yml \
		up --build spiffworkflow-connector

.PHONY : arena
arena:
	docker build \
		-f sartography/arena/Dockerfile \
		-t arena-dev \
		../../sartography/spiff-arena

# TODO: rename these
.PHONY : stop-testing
stop-testing:
	docker compose \
		-f docker-compose.yml \
		-f sartography/frontend/main-latest.docker-compose.yml \
		-f sartography/backend/sqlite.docker-compose.yml \
		-f sartography/connector-proxy-status-im/docker-compose.yml \
		down

.PHONY : testing
run-testing: stop-testing
	RUN_AS=$(ME) docker compose \
		-f docker-compose.yml \
		-f sartography/frontend/main-latest.docker-compose.yml \
		-f sartography/backend/sqlite.docker-compose.yml \
		-f sartography/connector-proxy-status-im/docker-compose.yml \
		up -d --build

.PHONY: copy-elunit-wheel
copy-elunit-wheel:
	cp ../../sartography/spiff-element-units/module/target/wheels/spiff_element_units-0.1.0-cp39-abi3-manylinux_2_28_x86_64.whl ../../sartography/spiff-arena/spiffworkflow-backend/local_wheels

.PHONY : backend-sh
backend-sh:
	docker exec -it spiffworkflow-backend /bin/bash

.PHONY : backend-logs
backend-logs:
	docker logs -f spiffworkflow-backend

.PHONY: copy-spec-json
copy-spec-json:
	docker compose cp spiffworkflow-backend:/app/local/instance/bpmn_spec_dict.json .
