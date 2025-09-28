FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY crop-yield-api/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY crop-yield-api /app

EXPOSE 5000

CMD ["python", "run.py"]


