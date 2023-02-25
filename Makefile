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
