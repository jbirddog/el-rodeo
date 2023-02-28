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

.PHONY : spiffworkflow-backend-deps
spiffworkflow-backend-deps:
	docker build \
		-f sartography/spiff-arena/spiffworkflow-backend/deps.Dockerfile \
		-t spiffworkflow-backend-deps \
		../../sartography/spiff-arena/spiffworkflow-backend

.PHONY : spiffworkflow-backend-dev
spiffworkflow-backend-dev: spiffworkflow-backend-deps
	docker build \
		-f sartography/spiff-arena/spiffworkflow-backend/base.Dockerfile \
		-t spiffworkflow-backend-dev \
		../../sartography/spiff-arena/spiffworkflow-backend

.PHONY : spiffworkflow-backend-sqlite-dev
spiffworkflow-backend-sqlite-dev: spiffworkflow-backend-dev
	docker compose \
		-f sartography/spiff-arena/spiffworkflow-backend/docker-compose.yml \
		up --pull never spiffworkflow-backend-sqlite-dev

.PHONY : spiffworklow-frontend-main-latest
spiffworkflow-frontend-main-latest:
	docker compose \
		-f sartography/frontend/main-latest.docker-compose.yml \
		up

.PHONY : stop-testing
stop-testing:
	docker compose \
		-f docker-compose.yml \
		-f sartography/frontend/main-latest.docker-compose.yml \
		-f sartography/backend/sqlite.docker-compose.yml \
		down

.PHONY : testing
testing: stop-testing
	docker compose \
		-f docker-compose.yml \
		-f sartography/frontend/main-latest.docker-compose.yml \
		-f sartography/backend/sqlite.docker-compose.yml \
		up -d
