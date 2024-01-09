#!/bin/sh

poetry install --only=root
poetry run flask db init
poetry run flask db migrate
poetry run flask db upgrade

# TODO: break out sqlite specific parts
sqlite3 "${FLASK_INSTANCE_PATH}/db_local_development.sqlite3" << END

INSERT INTO user (
  username, service, service_id, display_name, email, updated_at_in_seconds, created_at_in_seconds
)
VALUES (
  "system",
  "system",
  "system",
  "system",
  "system",
  1677696294,
  1677696294
);

END

poetry run flask run --host=0.0.0.0
