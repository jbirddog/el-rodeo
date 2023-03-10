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
	docker compose \
		-f docker-compose.yml \
		-f sartography/frontend/main-latest.docker-compose.yml \
		-f sartography/backend/sqlite.docker-compose.yml \
		-f sartography/connector-proxy-status-im/docker-compose.yml \
		up -d --build
