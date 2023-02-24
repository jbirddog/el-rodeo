.PHONY : spiffworkflow-tests
spiffworkflow-tests:
	docker compose build spiffworkflow-tests

.PHONY : spiffworkflow-tests-par
spiffworkflow-tests-par:
	docker compose build spiffworkflow-tests-par
