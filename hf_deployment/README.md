---
title: Food Vision AI API
emoji: 
colorFrom: orange
colorTo: red
sdk: docker
app_file: app.py
pinned: false
license: mit
---

# Food Vision AI API

**AI-Powered Food Recognition API** deployed on Hugging Face Spaces

This is the backend API for Food Vision AI - an advanced machine learning application that identifies food items from images using Hugging Face's pre-trained food classification model.

## Features

- **AI-Powered Recognition** - Uses `nateraw/food` model trained on Food-101 dataset
- **94% Accuracy** - Recognizes 101 different food categories
- **Fast Processing** - Get results in 1-2 seconds
- **RESTful API** - Easy to integrate with any frontend
- **Privacy First** - All processing happens on the server, no data stored

## API Endpoints

### Health Check
```
GET /api/health
```

### Food Prediction
```
POST /api/predict
Content-Type: multipart/form-data
Body: image file (PNG, JPG, JPEG, GIF, WebP)
```

**Response:**
```json
{
  "success": true,
  "predictions": [
    {
      "class": "pizza",
      "confidence": 95.23
    },
    {
      "class": "hamburger", 
      "confidence": 3.45
    }
  ],
  "message": "Food classification completed successfully"
}
```

## Usage Example

```bash
curl -X POST \
  -F "image=@your_food_image.jpg" \
  https://your-username-food-vision-ai.hf.space/api/predict
```

## Tech Stack

- **Flask** - Web framework
- **PyTorch** - Deep learning framework
- **Transformers** - Hugging Face model library
- **Pillow** - Image processing
- **Gunicorn** - WSGI server

## Model Information

- **Model**: `nateraw/food` from Hugging Face Hub
- **Dataset**: Food-101 (101,000 food images)
- **Categories**: 101 different food types
- **Accuracy**: ~94% on test data

## Supported Food Categories

The model recognizes 101 food categories including pizza, hamburger, sushi, pasta, apple pie, cheesecake, ice cream, caesar salad, grilled salmon, and many more!

## Frontend

This API pairs with a beautiful React frontend. Check out the complete Food Vision AI application for the full experience.

---

Built using Hugging Face Transformers and deployed on Hugging Face Spaces