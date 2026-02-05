import os

class Config:
    MODEL_NAME = "nateraw/food"
    MAX_IMAGE_SIZE = 10 * 1024 * 1024
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
    
    DEBUG = False
    HOST = '0.0.0.0'
    PORT = 7860
    
    CORS_ORIGINS = ['*']
    
    FOOD_101_CLASSES = [
        "apple_pie", "baby_back_ribs", "baklava", "beef_carpaccio", "beef_tartare",
        "beet_salad", "beignets", "bibimbap", "bread_pudding", "breakfast_burrito",
        "bruschetta", "caesar_salad", "cannoli", "caprese_salad", "carrot_cake",
        "ceviche", "cheesecake", "cheese_plate", "chicken_curry", "chicken_quesadilla",
        "chicken_wings", "chocolate_cake", "chocolate_mousse", "churros", "clam_chowder",
        "club_sandwich", "crab_cakes", "creme_brulee", "croque_madame", "cup_cakes",
        "deviled_eggs", "donuts", "dumplings", "edamame", "eggs_benedict",
        "escargots", "falafel", "filet_mignon", "fish_and_chips", "foie_gras",
        "french_fries", "french_onion_soup", "french_toast", "fried_calamari", "fried_chicken",
        "frozen_yogurt", "garlic_bread", "gnocchi", "greek_salad", "grilled_cheese_sandwich",
        "grilled_salmon", "guacamole", "gyoza", "hamburger", "hot_dog",
        "ice_cream", "lasagna", "lobster_bisque", "lobster_roll_sandwich", "macaroni_and_cheese",
        "macarons", "miso_soup", "mussels", "nachos", "omelette",
        "onion_rings", "oysters", "pad_thai", "paella", "pancakes",
        "panna_cotta", "peking_duck", "pho", "pizza", "pork_chop",
        "poutine", "prime_rib", "pulled_pork_sandwich", "ramen", "ravioli",
        "red_velvet_cake", "risotto", "samosa", "sashimi", "scallops",
        "shrimp_scampi", "smoked_salmon", "sushi", "tacos", "takoyaki",
        "tiramisu", "tuna_tartare", "waffles"
    ]
    
    @staticmethod
    def allowed_file(filename):
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS