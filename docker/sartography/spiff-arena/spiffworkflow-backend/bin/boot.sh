#!/bin/sh

poetry install --only=root
#poetry run flask db upgrade
poetry run flask run
