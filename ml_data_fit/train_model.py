# train_complex_models.py
import pickle
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from sklearn.ensemble import RandomForestRegressor

# Sample data points for x (square footage)
square_footage = np.array([1000, 1500, 2000, 2500, 3000]).reshape(-1, 1)

# Linear relationship (simple reference model)
prices_linear = np.array([150000, 200000, 250000, 300000, 350000])
linear_model = LinearRegression()
linear_model.fit(square_footage, prices_linear)
with open("linear_model.pkl", "wb") as f:
    pickle.dump(linear_model, f)

# Quadratic relationship
prices_quadratic = np.array([150000, 230000, 310000, 410000, 520000])
quadratic_model = make_pipeline(PolynomialFeatures(degree=2), LinearRegression())
quadratic_model.fit(square_footage, prices_quadratic)
with open("quadratic_model.pkl", "wb") as f:
    pickle.dump(quadratic_model, f)

# Clearer cubic relationship
prices_cubic = np.array([150000, 350000, 800000, 1700000, 3000000])  # More dramatic increase
cubic_model = make_pipeline(PolynomialFeatures(degree=3), LinearRegression())
cubic_model.fit(square_footage, prices_cubic)
with open("cubic_model.pkl", "wb") as f:
    pickle.dump(cubic_model, f)

# Exponential relationship for contrast
prices_exponential = 5000 * np.exp(square_footage / 800)  # Exponential growth for contrast
exponential_model = make_pipeline(PolynomialFeatures(degree=4), LinearRegression())
exponential_model.fit(square_footage, prices_exponential.ravel())
with open("exponential_model.pkl", "wb") as f:
    pickle.dump(exponential_model, f)

# Sinusoidal relationship for comparison
prices_sinusoidal = np.sin(square_footage / 1000) * 100000 + 300000
sinusoidal_model = RandomForestRegressor()
sinusoidal_model.fit(square_footage, prices_sinusoidal)
with open("sinusoidal_model.pkl", "wb") as f:
    pickle.dump(sinusoidal_model, f)
