# Food Vision AI

<div align="center">

![Food Vision AI](https://img.shields.io/badge/Food%20Vision-AI%20Powered-orange?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.13-green?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0.0-red?style=for-the-badge&logo=flask&logoColor=white)
![Deployment Ready](https://img.shields.io/badge/Deployment-Ready-green?style=for-the-badge)

**AI-Powered Food Recognition Web Application**

*Upload any food image and get instant AI-powered identification with confidence scores*

[Quick Start](#quick-start) | [API Docs](#api-documentation) | [Deployment](#deployment)

</div>

---

## Overview

Food Vision AI is a modern web application that uses advanced artificial intelligence to identify food items from images. Built with a beautiful glassmorphism UI and powered by Hugging Face's pre-trained food classification model, it provides instant, accurate food recognition with detailed confidence scores.

**Perfect for:** Food bloggers, nutritionists, recipe apps, restaurant apps, and anyone curious about what they're eating!

---

## Features

- **AI-Powered Recognition** - Advanced machine learning model trained on 101 food categories
- **Lightning Fast** - Get results in 1-2 seconds
- **Beautiful UI** - Modern glassmorphism design with smooth animations
- **Top 5 Predictions** - Detailed confidence scores for each prediction
- **Responsive Design** - Works perfectly on desktop and mobile
- **Privacy First** - All processing happens locally, no data sent to external servers
- **Completely Free** - No API keys required, open-source model
- **Custom Favicon** - Beautiful gradient star favicon

---

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible component primitives

### Backend
- **Flask** - Lightweight Python web framework
- **Python 3.13** - Modern Python features
- **Hugging Face Transformers** - Pre-trained AI models
- **PyTorch** - Deep learning framework
- **PIL/Pillow** - Image processing

### AI Model
- **Model**: `nateraw/food` from Hugging Face Hub
- **Dataset**: Food-101 (101,000 food images)
- **Accuracy**: ~94% on test data
- **Categories**: 101 different food types

---

## Quick Start

### Prerequisites

- **Python 3.8+** (3.13 recommended)
- **Node.js 16+** (18+ recommended)
- **pip** (Python package manager)
- **npm** (Node package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/foodvisionai.git
   cd foodvisionai
   ```

2. **Set up the backend**
   ```bash
   # Create virtual environment
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r backend/requirements.txt
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Start the application**
   ```bash
   # Option 1: Use startup scripts (recommended)
   ./start_production.sh
   
   # Option 2: Manual start
   # Terminal 1 - Backend
   source venv/bin/activate
   python backend/app.py
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### First Prediction

1. Open http://localhost:3000
2. Click "Upload Image" or drag & drop a food image
3. Wait 1-2 seconds for AI processing
4. View the top 5 food predictions with confidence scores!

---

## Project Structure

```
foodvisionai/
├── backend/                  # Flask API Server
│   ├── app.py                # Main Flask application
│   ├── model.py              # AI model logic
│   ├── config.py             # Configuration settings
│   └── requirements.txt      # Python dependencies
├── frontend/                 # React Frontend
│   ├── src/                  # Source code
│   │   ├── components/       # React components
│   │   ├── App.tsx           # Main application
│   │   └── main.tsx          # Entry point
│   ├── public/               # Static assets
│   ├── package.json          # Dependencies
│   └── vite.config.ts        # Vite configuration
├── venv/                     # Python virtual environment
├── start_backend.sh          # Backend startup script
├── start_frontend.sh         # Frontend startup script
├── start_production.sh       # Production startup script
└── README.md                 
```

---

## API Documentation

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "message": "Food Vision AI API is running"
}
```

### Food Prediction
```http
POST /api/predict
Content-Type: multipart/form-data
```

**Request Body:**
- `image`: Food image file (JPG, PNG, WebP, GIF)
- Max file size: 10MB

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

### Example Usage

**JavaScript:**
```javascript
const formData = new FormData();
formData.append('image', imageFile);

const response = await fetch('http://localhost:8000/api/predict', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
console.log(result.predictions);
```

**Python:**
```python
import requests

with open('food_image.jpg', 'rb') as f:
    files = {'image': f}
    response = requests.post('http://localhost:8000/api/predict', files=files)
    result = response.json()
    print(result['predictions'])
```

---

## Model Information

### Pre-trained Model
- **Name**: `nateraw/food`
- **Provider**: Hugging Face Hub
- **Type**: Vision Transformer (ViT)
- **Training Data**: Food-101 dataset
- **Categories**: 101 food types
- **Model Size**: ~500MB (downloads automatically)

### Supported Food Categories
The model recognizes 101 different food categories including:
- Pizza, Hamburger, Sushi, Pasta
- Apple Pie, Cheesecake, Ice Cream
- Caesar Salad, Grilled Salmon
- And 94 more food types!

### Performance
- **Accuracy**: ~94% on Food-101 test set
- **Speed**: 1-2 seconds per prediction
- **Memory**: ~2GB RAM recommended
- **No API Keys**: Completely free to use

---

## Troubleshooting

### Common Issues

**Model Download Issues:**
- Ensure stable internet connection
- Check available disk space (~1GB for model cache)
- Model downloads to `~/.cache/huggingface/`
- Check Hugging Face Hub status

**CORS Issues:**
- Ensure frontend runs on `localhost:3000`
- Check CORS origins in `backend/config.py`
- Add your domain to allowed origins

**Memory Issues:**
- Model requires ~2GB RAM
- Consider using CPU if GPU memory is limited
- Close other applications if needed

**File Upload Issues:**
- Check file size (max 10MB)
- Ensure file is a valid image format
- Supported formats: PNG, JPG, JPEG, GIF, WebP

### Performance Issues

**Slow Predictions:**
- Check server resources
- Optimize image sizes before upload
- Consider upgrading server resources

**Memory Issues:**
- Monitor RAM usage
- Consider CPU-only inference
- Implement request queuing for high traffic

### Getting Help

1. Check the [Issues](https://github.com/yourusername/foodvisionai/issues) page
2. Review the troubleshooting section above
3. Create a new issue with:
   - Your operating system
   - Python/Node.js versions
   - Error messages
   - Steps to reproduce

**Support Resources:**

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Hugging Face Documentation](https://huggingface.co/docs)

---

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Setup

1. Follow the [Quick Start](#quick-start) guide
2. Make your changes
3. Test thoroughly
4. Ensure code follows the existing style
5. Update documentation if needed

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Hugging Face** for the amazing pre-trained models
- **Food-101 Dataset** creators for the training data
- **React** and **Flask** communities for excellent documentation
- **Radix UI** for accessible component primitives

---

## Contact

- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Email**: your.email@example.com
- **Project Link**: [https://github.com/yourusername/foodvisionai](https://github.com/yourusername/foodvisionai)

---
</div>
