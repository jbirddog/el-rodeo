.PHONY : spiffworkflow-tests
spiffworkflow-tests:
	docker build \
		-f docker/sartography/SpiffWorkflow/tests.Dockerfile \
		-t spiffworkflow-tests src/sartography/SpiffWorkflow \
		--target=tests

.PHONY : spiffworkflow-tests-par
spiffworkflow-tests-par:
	docker build \
		-f docker/sartography/SpiffWorkflow/tests.Dockerfile \
		-t spiffworkflow-tests src/sartography/SpiffWorkflow \
		--target=tests-par
