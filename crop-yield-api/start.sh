#!/bin/bash
# Production startup script for Render deployment

# Set Python path
export PYTHONPATH="${PYTHONPATH}:/opt/render/project/src"

# Start the application with gunicorn
exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --timeout 120 run:app
