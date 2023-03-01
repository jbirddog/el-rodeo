#!/bin/sh

poetry run flask db init
poetry run flask db migrate
poetry run flask db upgrade
poetry run flask run --host=0.0.0.0
