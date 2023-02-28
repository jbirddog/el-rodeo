FROM spiffworkflow-backend-deps AS base

COPY README.rst .

CMD ["./bin/boot.sh"]

