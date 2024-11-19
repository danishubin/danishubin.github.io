# app.py
from flask import Flask, render_template, request, jsonify, send_file
import pickle
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
from io import BytesIO

import base64

# Use Agg backend for non-GUI rendering
matplotlib.use('Agg')
# Load models
with open("linear_model.pkl", "rb") as f:
    linear_model = pickle.load(f)
with open("quadratic_model.pkl", "rb") as f:
    quadratic_model = pickle.load(f)
with open("cubic_model.pkl", "rb") as f:
    cubic_model = pickle.load(f)
with open("exponential_model.pkl", "rb") as f:
    exponential_model = pickle.load(f)
with open("sinusoidal_model.pkl", "rb") as f:
    sinusoidal_model = pickle.load(f)

app = Flask(__name__)

# Sample data for plotting
square_footage = np.array([1000, 1500, 2000, 2500, 3000])
prices_linear = np.array([150000, 200000, 250000, 300000, 350000])
prices_quadratic = np.array([150000, 230000, 310000, 410000, 520000])
prices_cubic = np.array([150000, 350000, 800000, 1700000, 3000000])  # More dramatic increase
prices_exponential = np.exp(square_footage / 1000) * 10000
prices_sinusoidal = np.sin(square_footage / 1000) * 100000 + 300000

@app.route('/')
def home():
    # Generate plots for each model and pass to the template
    plots = {
        'linear': generate_plot('linear'),
        'quadratic': generate_plot('quadratic'),
        'cubic': generate_plot('cubic'),
        'exponential': generate_plot('exponential'),
        'sinusoidal': generate_plot('sinusoidal')
    }
    return render_template('index.html', plots=plots)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    square_footage = float(data.get("square_footage", 0))  # Get the single value from the request
    model_type = data.get("model_type", "linear")

    # Reshape the input to (1, 1) for a single data point with one feature
    features = np.array([[square_footage]])

    # Select the model based on the request
    if model_type == "linear":
        prediction = linear_model.predict(features)[0]
    elif model_type == "quadratic":
        prediction = quadratic_model.predict(features)[0]
    elif model_type == "cubic":
        prediction = cubic_model.predict(features)[0]
    elif model_type == "exponential":
        prediction = exponential_model.predict(features)[0]
    elif model_type == "sinusoidal":
        prediction = sinusoidal_model.predict(features)[0]
    else:
        prediction = "Unknown model type"

    return jsonify({"predicted_price": prediction})


def generate_plot(model_type):
    # Sample data for plotting
    square_footage = np.array([1000, 1500, 2000, 2500, 3000]).reshape(-1, 1)
    if model_type == 'linear':
        prices = np.array([150000, 200000, 250000, 300000, 350000])
    elif model_type == 'quadratic':
        prices = np.array([150000, 230000, 310000, 410000, 520000])
    elif model_type == 'cubic':
        prices = np.array([150000, 350000, 800000, 1700000, 3000000])  # Dramatic increase
    elif model_type == 'exponential':
        prices = np.exp(square_footage / 1000).flatten() * 10000
    elif model_type == 'sinusoidal':
        prices = (np.sin(square_footage / 1000).flatten() * 100000) + 300000
    else:
        prices = np.array([150000, 200000, 250000, 300000, 350000])  # Default to linear model

    # Create the plot
    plt.figure(figsize=(8, 5))
    plt.plot(square_footage.flatten(), prices, marker='o', linestyle='-', color='blue')
    plt.title(f'{model_type.capitalize()} Model')
    plt.xlabel("Square Footage")
    plt.ylabel("Prices")
    plt.grid(True)

    # Convert plot to base64 string
    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    base64_img = base64.b64encode(img.getvalue()).decode('utf-8')
    plt.close()
    return base64_img


if __name__ == "__main__":
    app.run(debug=True)
