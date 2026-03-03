#!/bin/sh

echo "Running Alembic migrations..."
cd /app && alembic -c src/alembic.ini upgrade head

echo "Starting server..."
exec uvicorn src.app.main:app --host 0.0.0.0 --port 8000 --reload
