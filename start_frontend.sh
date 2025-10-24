#!/bin/bash

# Food Vision AI Frontend Startup Script
echo "🍕 Starting Food Vision AI Frontend..."

# Navigate to project directory
cd "$(dirname "$0")"

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    echo "❌ Frontend directory not found!"
    echo "Please make sure your React app is in the 'frontend/' folder"
    exit 1
fi

# Navigate to frontend directory
cd frontend

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found in frontend directory!"
    echo "Please make sure this is a valid React project"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the React development server
echo "🚀 Starting React development server on http://localhost:3000"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

npm start
