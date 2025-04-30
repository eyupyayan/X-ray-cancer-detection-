from flask import Flask, request, jsonify
from flask_cors import CORS 
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

app = Flask(__name__)
CORS(app)
model = load_model("xray_classifier_scratch.h5")
img_size = (224, 224)



@app.route("/predict", methods=["POST"])
def predict():
    file = request.files["image"]
    img = Image.open(file).convert("RGB")
    img = img.resize(img_size)
    img_array = np.expand_dims(np.array(img) / 255.0, axis=0)
    prediction = model.predict(img_array)[0][0]
    print("Prediksjonsscore:", prediction)
    result = "Positive" if prediction > 0.4 else "Negative"
    percent = round(float(prediction) * 100, 2)
    return jsonify({"prediction": result, "score": float(prediction)})
if __name__ == "__main__":
    app.run(debug=True)
