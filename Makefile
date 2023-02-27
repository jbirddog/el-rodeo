.PHONY : spiffworkflow-tests
spiffworkflow-tests:
	docker build \
		-f docker/sartography/SpiffWorkflow/tests.Dockerfile \
		-t spiffworkflow-tests \
		--target tests \
		../../sartography/SpiffWorkflow

.PHONY : spiffworkflow-tests-par
spiffworkflow-tests-par:
	docker build \
		-f docker/sartography/SpiffWorkflow/tests.Dockerfile \
		-t spiffworkflow-tests \
		--target tests-par \
		../../sartography/SpiffWorkflow

.PHONY : spiffworkflow-backend-deps
spiffworkflow-backend-deps:
	docker build \
		-f docker/sartography/spiff-arena/spiffworkflow-backend/deps.Dockerfile \
		-t spiffworkflow-backend-deps \
		src/sartography/spiff-arena/spiffworkflow-backend

.PHONY : spiffworkflow-backend-dev
spiffworkflow-backend-dev: spiffworkflow-backend-deps
	docker build \
		-f docker/sartography/spiff-arena/spiffworkflow-backend/base.Dockerfile \
		-t spiffworkflow-backend-dev \
		src/sartography/spiff-arena/spiffworkflow-backend



#.PHONY : spiffworkflow-backend-dev
#spiffworkflow-backend-dev:
#	docker compose \
#		-f docker/sartography/spiff-arena/spiffworkflow-backend/docker-compose.yml \
#		build spiffworkflow-backend-dev

.PHONY : spiffworkflow-backend-sqlite-dev
spiffworkflow-backend-sqlite-dev: spiffworkflow-backend-dev
	docker compose \
		-f docker/sartography/spiff-arena/spiffworkflow-backend/docker-compose.yml \
		up --pull never spiffworkflow-backend-sqlite-dev
