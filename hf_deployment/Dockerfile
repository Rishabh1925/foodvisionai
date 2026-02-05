# Use Python 3.11 base image (compatible with Hugging Face Spaces)
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY backend/ .

# Create uploads directory if needed
RUN mkdir -p uploads

# Expose port 7860 (required by Hugging Face Spaces)
EXPOSE 7860

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Run the application with Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:7860", "--workers", "1", "--timeout", "120", "app:app"]