#!/bin/sh

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

INSERT INTO secret (
  key, value, user_id, updated_at_in_seconds, created_at_in_seconds
)
VALUES (
  "POSTGRES_CONN",
  "ZnNjAAJZhmTSOSy8GgSQSOPWbyhE/UYbUHN0YAmL6gQAcdmHGz1ly99sjJF16jljuRsnSd7L5WXgnz7uN7+UJWfmKaixjGpHVH2QkK0c3Zybkjgt1dNevy1MuBt3zPNelc0rqWP03IxybAxrol/VuU/YmXH3vTGGu0ls9Pn74Jk=",
  1,
  1677696294,
  1677696294
);

END

poetry run flask run --host=0.0.0.0
