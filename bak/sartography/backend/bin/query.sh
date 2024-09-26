#!/bin/sh

sqlite3 local/instance/db_local_development.sqlite3 < /app/queries/last_instance_tasks.sql
