.PHONY : spiffworkflow-tests
spiffworkflow-tests:
	docker compose \
		-f docker/sartography/SpiffWorkflow/docker-compose.yml \
		build spiffworkflow-tests

.PHONY : spiffworkflow-tests-par
spiffworkflow-tests-par:
	docker compose \
		-f docker/sartography/SpiffWorkflow/docker-compose.yml \
		build spiffworkflow-tests-par

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
