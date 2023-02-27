#!/bin/sh

poetry install --only=root
#poetry run flask db upgrade
poetry run flask run --host=0.0.0.0
