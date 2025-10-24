import torch
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import numpy as np
import io
from config import Config

class FoodVisionModel:
    def __init__(self, model_name="nateraw/food"):
        self.model_name = model_name
        self.processor = None
        self.model = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self._load_model()
    
    def _load_model(self):
        """Load the pre-trained model and processor"""
        try:
            print(f"Loading model: {self.model_name}")
            self.processor = AutoImageProcessor.from_pretrained(self.model_name)
            self.model = AutoModelForImageClassification.from_pretrained(self.model_name)
            self.model.to(self.device)
            self.model.eval()
            print("Model loaded successfully!")
        except Exception as e:
            print(f"Error loading model: {e}")
            raise e
    
    def preprocess_image(self, image_file):
        """Preprocess the uploaded image"""
        try:
            # Open and convert image
            image = Image.open(image_file).convert('RGB')
            
            # Process image for the model
            inputs = self.processor(images=image, return_tensors="pt")
            inputs = {k: v.to(self.device) for k, v in inputs.items()}
            
            return inputs
        except Exception as e:
            print(f"Error preprocessing image: {e}")
            raise e
    
    def predict(self, image_file, top_k=5):
        """Make prediction on the uploaded image"""
        try:
            # Preprocess image
            inputs = self.preprocess_image(image_file)
            
            # Make prediction
            with torch.no_grad():
                outputs = self.model(**inputs)
                logits = outputs.logits
            
            # Get probabilities
            probabilities = torch.nn.functional.softmax(logits[0], dim=-1)
            
            # Get top-k predictions
            top_indices = torch.topk(probabilities, top_k).indices
            top_probabilities = torch.topk(probabilities, top_k).values
            
            # Convert to CPU and numpy for JSON serialization
            top_indices = top_indices.cpu().numpy()
            top_probabilities = top_probabilities.cpu().numpy()
            
            # Get class labels directly from the model
            class_labels = self.model.config.id2label
            
            # Format results
            results = []
            max_confidence = float(top_probabilities[0]) * 100
            
            for idx, prob in zip(top_indices, top_probabilities):
                # Get the food name directly from the model's id2label mapping
                # The model uses integer keys, not string keys
                food_name = class_labels.get(int(idx), f"Unknown_{idx}")
                confidence = float(prob) * 100  # Convert to percentage
                
                # If the highest confidence is very low, it might not be food
                if max_confidence < 10.0:
                    # Check if it looks like a beverage based on common patterns
                    if any(beverage in food_name.lower() for beverage in ['wine', 'beer', 'coffee', 'tea', 'juice', 'soda', 'water']):
                        food_name = f"🍷 {food_name} (beverage)"
                    else:
                        food_name = f"❓ {food_name} (low confidence - might not be food)"
                
                results.append({
                    "class": food_name,
                    "confidence": round(confidence, 2)
                })
            
            return results
            
        except Exception as e:
            print(f"Error making prediction: {e}")
            raise e

# Global model instance
model_instance = None

def get_model():
    """Get or create the global model instance"""
    global model_instance
    if model_instance is None:
        model_instance = FoodVisionModel()
    return model_instance
