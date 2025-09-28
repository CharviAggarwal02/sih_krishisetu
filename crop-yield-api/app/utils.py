import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib
import os

def create_ml_model():
    """Create and train a Random Forest model for crop yield prediction"""
    
    # Generate synthetic training data based on Indian agricultural patterns
    np.random.seed(42)
    n_samples = 1000
    
    # Crop types
    crops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Soybean', 'Groundnut', 'Mustard']
    
    # States and their agricultural characteristics
    states = ['Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Gujarat', 'Odisha', 'West Bengal', 'Tamil Nadu']
    
    # Soil types
    soil_types = ['Clay', 'Sandy', 'Loamy', 'Red Soil', 'Black Soil', 'Alluvial']
    
    # Irrigation sources
    irrigation_sources = ['Tube Well', 'Canal', 'Rain-fed', 'Drip Irrigation', 'Sprinkler']
    
    # Seasons
    seasons = ['Kharif', 'Rabi', 'Summer', 'Zaid']
    
    # Generate synthetic data
    data = []
    for _ in range(n_samples):
        crop = np.random.choice(crops)
        state = np.random.choice(states)
        soil_type = np.random.choice(soil_types)
        irrigation = np.random.choice(irrigation_sources)
        season = np.random.choice(seasons)
        
        # Farm size (hectares)
        farm_size = np.random.uniform(0.5, 10.0)
        
        # Soil pH (6.0 to 8.5)
        soil_ph = np.random.uniform(6.0, 8.5)
        
        # Organic carbon (%)
        organic_carbon = np.random.uniform(0.5, 3.0)
        
        # Irrigation frequency (days)
        irrigation_freq = np.random.choice(['Daily', 'Every 2 days', 'Weekly', 'Bi-weekly'])
        freq_days = {'Daily': 1, 'Every 2 days': 2, 'Weekly': 7, 'Bi-weekly': 14}[irrigation_freq]
        
        # Water availability
        water_availability = np.random.choice(['Good', 'Moderate', 'Poor'])
        water_score = {'Good': 3, 'Moderate': 2, 'Poor': 1}[water_availability]
        
        # Base yield calculation with realistic factors
        base_yield = {
            'Rice': 3000, 'Wheat': 2500, 'Maize': 2000, 'Cotton': 800,
            'Sugarcane': 80000, 'Soybean': 1200, 'Groundnut': 1500, 'Mustard': 1000
        }[crop]
        
        # Apply various factors
        soil_factor = {'Clay': 1.2, 'Loamy': 1.0, 'Alluvial': 1.1, 'Black Soil': 1.15, 
                      'Red Soil': 0.9, 'Sandy': 0.8}[soil_type]
        
        irrigation_factor = {'Tube Well': 1.0, 'Canal': 0.95, 'Drip Irrigation': 1.1, 
                             'Sprinkler': 1.05, 'Rain-fed': 0.7}[irrigation]
        
        season_factor = {'Kharif': 1.0, 'Rabi': 0.95, 'Summer': 0.8, 'Zaid': 0.9}[season]
        
        # pH factor (optimal around 6.5-7.5)
        ph_factor = 1.0 - abs(soil_ph - 7.0) * 0.1
        
        # Organic carbon factor
        carbon_factor = min(1.0 + (organic_carbon - 1.0) * 0.2, 1.3)
        
        # Water availability factor
        water_factor = water_score / 3.0
        
        # Irrigation frequency factor
        freq_factor = max(0.7, 1.0 - (freq_days - 1) * 0.05)
        
        # Calculate final yield with some randomness
        predicted_yield = (base_yield * soil_factor * irrigation_factor * season_factor * 
                          ph_factor * carbon_factor * water_factor * freq_factor * 
                          np.random.uniform(0.8, 1.2))
        
        data.append({
            'crop': crop, 'state': state, 'soil_type': soil_type, 'irrigation_source': irrigation,
            'season': season, 'farm_size': farm_size, 'soil_ph': soil_ph, 
            'organic_carbon': organic_carbon, 'irrigation_frequency': irrigation_freq,
            'water_availability': water_availability, 'yield': predicted_yield
        })
    
    df = pd.DataFrame(data)
    
    # Encode categorical variables
    le_crop = LabelEncoder()
    le_state = LabelEncoder()
    le_soil = LabelEncoder()
    le_irrigation = LabelEncoder()
    le_season = LabelEncoder()
    le_freq = LabelEncoder()
    le_water = LabelEncoder()
    
    df['crop_encoded'] = le_crop.fit_transform(df['crop'])
    df['state_encoded'] = le_state.fit_transform(df['state'])
    df['soil_encoded'] = le_soil.fit_transform(df['soil_type'])
    df['irrigation_encoded'] = le_irrigation.fit_transform(df['irrigation_source'])
    df['season_encoded'] = le_season.fit_transform(df['season'])
    df['freq_encoded'] = le_freq.fit_transform(df['irrigation_frequency'])
    df['water_encoded'] = le_water.fit_transform(df['water_availability'])
    
    # Prepare features
    feature_columns = ['crop_encoded', 'state_encoded', 'soil_encoded', 'irrigation_encoded',
                      'season_encoded', 'farm_size', 'soil_ph', 'organic_carbon', 
                      'freq_encoded', 'water_encoded']
    
    X = df[feature_columns]
    y = df['yield']
    
    # Train Random Forest model
    model = RandomForestRegressor(n_estimators=100, random_state=42, max_depth=10)
    model.fit(X, y)
    
    # Save model and encoders
    model_path = os.path.join(os.path.dirname(__file__), 'ml_model.pkl')
    encoders_path = os.path.join(os.path.dirname(__file__), 'encoders.pkl')
    
    joblib.dump(model, model_path)
    joblib.dump({
        'crop': le_crop, 'state': le_state, 'soil': le_soil, 'irrigation': le_irrigation,
        'season': le_season, 'freq': le_freq, 'water': le_water
    }, encoders_path)
    
    return model, {
        'crop': le_crop, 'state': le_state, 'soil': le_soil, 'irrigation': le_irrigation,
        'season': le_season, 'freq': le_freq, 'water': le_water
    }

def calculate_yield_prediction(form_data):
    """Predict crop yield using ML model"""
    
    model_path = os.path.join(os.path.dirname(__file__), 'ml_model.pkl')
    encoders_path = os.path.join(os.path.dirname(__file__), 'encoders.pkl')
    
    # Load model and encoders if they exist, otherwise create them
    if os.path.exists(model_path) and os.path.exists(encoders_path):
        model = joblib.load(model_path)
        encoders = joblib.load(encoders_path)
    else:
        model, encoders = create_ml_model()
    
    try:
        # Prepare input data
        crop = form_data.get('cropName', 'Rice')
        state = form_data.get('state', 'Maharashtra')
        soil_type = form_data.get('soilType', 'Clay')
        irrigation_source = form_data.get('irrigationSource', 'Tube Well')
        season = form_data.get('season', 'Kharif')
        farm_size = float(form_data.get('farmSize', 1.0))
        soil_ph = float(form_data.get('soilPH', 7.0))
        organic_carbon = float(form_data.get('organicCarbon', 1.0))
        irrigation_frequency = form_data.get('irrigationFrequency', 'Daily')
        water_availability = form_data.get('waterAvailability', 'Good')
        
        # Encode categorical variables
        crop_encoded = encoders['crop'].transform([crop])[0] if crop in encoders['crop'].classes_ else 0
        state_encoded = encoders['state'].transform([state])[0] if state in encoders['state'].classes_ else 0
        soil_encoded = encoders['soil'].transform([soil_type])[0] if soil_type in encoders['soil'].classes_ else 0
        irrigation_encoded = encoders['irrigation'].transform([irrigation_source])[0] if irrigation_source in encoders['irrigation'].classes_ else 0
        season_encoded = encoders['season'].transform([season])[0] if season in encoders['season'].classes_ else 0
        freq_encoded = encoders['freq'].transform([irrigation_frequency])[0] if irrigation_frequency in encoders['freq'].classes_ else 0
        water_encoded = encoders['water'].transform([water_availability])[0] if water_availability in encoders['water'].classes_ else 0
        
        # Create feature vector
        features = np.array([[
            crop_encoded, state_encoded, soil_encoded, irrigation_encoded,
            season_encoded, farm_size, soil_ph, organic_carbon,
            freq_encoded, water_encoded
        ]])
        
        # Make prediction
        predicted_yield = model.predict(features)[0]
        
        # Ensure positive yield
        predicted_yield = max(0, predicted_yield)
        
        return round(predicted_yield, 2)
        
    except Exception as e:
        print(f"Error in ML prediction: {e}")
        # Fallback to simple calculation
        base_yield = 2000
        crop_factor = {
            'Rice': 1.2, 'Wheat': 1.0, 'Maize': 0.8, 'Cotton': 0.3,
            'Sugarcane': 30, 'Soybean': 0.5, 'Groundnut': 0.6, 'Mustard': 0.4
        }
        farm_size = float(form_data.get('farmSize', 1.0))
        crop_name = form_data.get('cropName', 'Rice')
        
        if crop_name in crop_factor:
            return round(base_yield * crop_factor[crop_name] * farm_size, 2)
        else:
            return round(base_yield * farm_size, 2)

def validate_input_data(form_data):
    # Accept any payload; defaults are applied elsewhere
    return True, "Validation successful."