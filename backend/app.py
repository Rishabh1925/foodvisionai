from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from model import get_model
from config import Config

app = Flask(__name__)
CORS(app, origins=Config.CORS_ORIGINS)

# Configure upload settings
app.config['MAX_CONTENT_LENGTH'] = Config.MAX_IMAGE_SIZE

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Food Vision AI API is running"})

@app.route('/api/predict', methods=['POST'])
def predict_food():
    """Main prediction endpoint"""
    try:
        # Check if image file is present
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        file = request.files['image']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({"error": "No image file selected"}), 400
        
        # Check file extension
        if not Config.allowed_file(file.filename):
            return jsonify({
                "error": f"Invalid file type. Allowed types: {', '.join(Config.ALLOWED_EXTENSIONS)}"
            }), 400
        
        # Get model and make prediction
        model = get_model()
        predictions = model.predict(file, top_k=5)
        
        return jsonify({
            "success": True,
            "predictions": predictions,
            "message": "Food classification completed successfully"
        })
        
    except Exception as e:
        print(f"Error in prediction: {e}")
        return jsonify({
            "error": "An error occurred during prediction",
            "details": str(e)
        }), 500

@app.errorhandler(413)
def too_large(e):
    """Handle file too large error"""
    return jsonify({
        "error": f"File too large. Maximum size allowed: {Config.MAX_IMAGE_SIZE // (1024*1024)}MB"
    }), 413

@app.errorhandler(400)
def bad_request(e):
    """Handle bad request error"""
    return jsonify({"error": "Bad request"}), 400

@app.errorhandler(500)
def internal_error(e):
    """Handle internal server error"""
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    print("Starting Food Vision AI API...")
    print(f"Model: {Config.MODEL_NAME}")
    print(f"Server running on http://{Config.HOST}:{Config.PORT}")
    
    app.run(
        host=Config.HOST,
        port=Config.PORT,
        debug=Config.DEBUG
    )