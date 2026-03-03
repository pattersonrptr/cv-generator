# !/bin/bash

cd src/
alembic revision --autogenerate -m "$1"
alembic upgrade head
