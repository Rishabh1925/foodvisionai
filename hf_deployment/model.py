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
        try:
            image = Image.open(image_file).convert('RGB')
            inputs = self.processor(images=image, return_tensors="pt")
            inputs = {k: v.to(self.device) for k, v in inputs.items()}
            return inputs
        except Exception as e:
            print(f"Error preprocessing image: {e}")
            raise e
    
    def predict(self, image_file, top_k=5):
        try:
            inputs = self.preprocess_image(image_file)
            
            with torch.no_grad():
                outputs = self.model(**inputs)
                logits = outputs.logits
            
            probabilities = torch.nn.functional.softmax(logits[0], dim=-1)
            top_indices = torch.topk(probabilities, top_k).indices
            top_probabilities = torch.topk(probabilities, top_k).values
            top_indices = top_indices.cpu().numpy()
            top_probabilities = top_probabilities.cpu().numpy()
            class_labels = self.model.config.id2label
            results = []
            max_confidence = float(top_probabilities[0]) * 100
            
            for idx, prob in zip(top_indices, top_probabilities):
                food_name = class_labels.get(int(idx), f"Unknown_{idx}")
                confidence = float(prob) * 100
                
                if max_confidence < 10.0:
                    if any(beverage in food_name.lower() for beverage in ['wine', 'beer', 'coffee', 'tea', 'juice', 'soda', 'water']):
                        food_name = f"{food_name} (beverage)"
                    else:
                        food_name = f"{food_name} (low confidence - might not be food)"
                
                results.append({
                    "class": food_name,
                    "confidence": round(confidence, 2)
                })
            
            return results
            
        except Exception as e:
            print(f"Error making prediction: {e}")
            raise e

model_instance = None

def get_model():
    global model_instance
    if model_instance is None:
        model_instance = FoodVisionModel()
    return model_instance
