from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.inception_v3 import preprocess_input
import numpy as np
from PIL import Image
import io

# Model store in google drive with link https://drive.google.com/file/d/1dE-vWO8gxPc2xfO3yy5zpJIw8kb3snLe/view?usp=sharing
# Load the model
model = load_model('model.h5')

# Define the class labels (you need to have the labels order from training)
class_labels = {
    0: 'ArtDecoSideboard',
    1: 'BaroqueDresser',
    2: 'BeanBagChair',
    3: 'BunkBedWithSlide',
    4: 'ButterflyChair',
    5: 'CantileverChair',
    6: 'ConvertibleDiningTable',
    7: 'EggChair',
    8: 'FaintingCouch',
    9: 'FloatingBookshelf',
    10: 'FutonSofaBed',
    11: 'GlassCoffeeTable',
    12: 'HammockChair',
    13: 'IndustrialPipeDesk',
    14: 'LadderBookshelf',
    15: 'MidCenturyModernSofa',
    16: 'ModularSectionalSofa',
    17: 'MurphyBed',
    18: 'NestingTables',
    19: 'PapasanChair',
    20: 'ParsonsChair',
    21: 'PedestalTable',
    22: 'PlatformBedWithStorage',
    23: 'RevolvingBookcase',
    24: 'RollTopDesk',
    25: 'SaddleStool',
    26: 'SecretaryDesk',
    27: 'SuspendedSwingChair',
    28: 'SwivelArmchair',
    29: 'TrestleDiningTable',
    30: 'TrundleBed',
    31: 'VictorianChaiseLounge'
}

# Initialize Flask app
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the image from the request
        img_file = request.files['image'].read()
        img = Image.open(io.BytesIO(img_file))

        # Preprocess the image (resize, convert to numpy, normalize)
        img = img.resize((299, 299))  # Resize to the model's input size
        img_array = np.array(img)     # Convert to numpy array
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        
        # Normalize the image using preprocess_input
        img_array = preprocess_input(img_array)

        # Make prediction
        prediction = model.predict(img_array)

        # Get the predicted class index (the highest probability)
        predicted_class_index = np.argmax(prediction, axis=1)[0]

        # Ensure the predicted class index is a regular Python int (not np.int64)
        predicted_class_index = int(predicted_class_index)

        # Get the corresponding label for the predicted class
        predicted_class_label = class_labels[predicted_class_index]

        # Return both the predicted class index and the label
        return jsonify({
            "predicted_class_index": predicted_class_index,
            "predicted_class_label": predicted_class_label
        })

    except Exception as e:
        return jsonify({"error": str(e)})

# Start the Flask app
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
