#!/bin/bash

# Food Vision AI Production Startup Script
echo "🍕 Starting Food Vision AI in Production Mode..."

# Navigate to project directory
cd "$(dirname "$0")"

# Kill any existing processes
echo "🧹 Cleaning up existing processes..."
pkill -f "python.*app.py" 2>/dev/null || true
lsof -ti:8000 | xargs kill -9 2>/dev/null || true

# Wait a moment
sleep 2

# Start the backend
echo "🚀 Starting Backend Server..."
source venv/bin/activate
python backend/app.py &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 10

# Check if backend is running
if curl -s http://localhost:8000/api/health > /dev/null; then
    echo "✅ Backend is running on http://localhost:8000"
else
    echo "❌ Backend failed to start"
    exit 1
fi

echo "🎉 Food Vision AI is ready!"
echo "📱 Frontend: http://localhost:3000 (run 'npm run dev' in frontend/ directory)"
echo "🔧 Backend API: http://localhost:8000"
echo "🛑 Press Ctrl+C to stop the backend server"

# Keep the script running and show backend logs
wait $BACKEND_PID
