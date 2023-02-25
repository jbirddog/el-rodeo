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

.PHONY : spiffworkflow-backend-dev
spiffworkflow-backend-dev:
	docker compose \
		-f docker/sartography/spiff-arena/spiffworkflow-backend/docker-compose.yml \
		build spiffworkflow-backend-dev

.PHONY : spiffworkflow-backend-sqlite-dev
spiffworkflow-backend-sqlite-dev:
	docker compose \
		-f docker/sartography/spiff-arena/spiffworkflow-backend/docker-compose.yml \
		up --pull never --build spiffworkflow-backend-sqlite-dev
