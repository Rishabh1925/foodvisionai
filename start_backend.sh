#!/bin/bash

# Food Vision AI Backend Startup Script
echo "🍕 Starting Food Vision AI Backend..."

# Navigate to project directory
cd "$(dirname "$0")"

# Activate virtual environment
source venv/bin/activate

# Start the Flask server
echo "🚀 Starting Flask server on http://localhost:5000"
echo "📱 Make sure your React frontend runs on http://localhost:3000"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

python backend/app.py
