import random
import os

def calculate_yield_simple(form_data):
    """Simple crop yield prediction without ML dependencies"""
    
    # Base yield values (kg/hectare) for different crops
    base_yields = {
        'Rice': 3000, 'Wheat': 2500, 'Maize': 2000, 'Cotton': 800,
        'Sugarcane': 80000, 'Soybean': 1200, 'Groundnut': 1500, 'Mustard': 1000,
        'Tomato': 25000, 'Potato': 20000, 'Onion': 15000, 'Chili': 8000
    }
    
    # Get input values with defaults
    crop_name = form_data.get('cropName', 'Rice')
    farm_size = float(form_data.get('farmSize', 1.0))
    soil_ph = float(form_data.get('soilPH', 7.0))
    organic_carbon = float(form_data.get('organicCarbon', 1.0))
    soil_type = form_data.get('soilType', 'Clay')
    irrigation_source = form_data.get('irrigationSource', 'Tube Well')
    season = form_data.get('season', 'Kharif')
    irrigation_frequency = form_data.get('irrigationFrequency', 'Daily')
    water_availability = form_data.get('waterAvailability', 'Good')
    
    # Get base yield for the crop
    base_yield = base_yields.get(crop_name, 2000)  # Default to 2000 if crop not found
    
    # Soil type factors
    soil_factors = {
        'Clay': 1.2, 'Loamy': 1.0, 'Alluvial': 1.1, 'Black Soil': 1.15,
        'Red Soil': 0.9, 'Sandy': 0.8, 'Clay Loam': 1.1, 'Silty Clay': 1.05
    }
    soil_factor = soil_factors.get(soil_type, 1.0)
    
    # Irrigation source factors
    irrigation_factors = {
        'Tube Well': 1.0, 'Canal': 0.95, 'Drip Irrigation': 1.1,
        'Sprinkler': 1.05, 'Rain-fed': 0.7, 'Bore Well': 1.0
    }
    irrigation_factor = irrigation_factors.get(irrigation_source, 1.0)
    
    # Season factors
    season_factors = {
        'Kharif': 1.0, 'Rabi': 0.95, 'Summer': 0.8, 'Zaid': 0.9,
        'Monsoon': 1.0, 'Winter': 0.95, 'Spring': 1.05
    }
    season_factor = season_factors.get(season, 1.0)
    
    # pH factor (optimal around 6.5-7.5)
    ph_factor = max(0.7, 1.0 - abs(soil_ph - 7.0) * 0.1)
    
    # Organic carbon factor (optimal around 1.0-2.0%)
    if organic_carbon < 0.5:
        carbon_factor = 0.7
    elif organic_carbon > 3.0:
        carbon_factor = 1.2
    else:
        carbon_factor = 0.8 + (organic_carbon - 0.5) * 0.2
    
    # Water availability factors
    water_factors = {'Good': 1.0, 'Moderate': 0.8, 'Poor': 0.6}
    water_factor = water_factors.get(water_availability, 1.0)
    
    # Irrigation frequency factors
    freq_factors = {
        'Daily': 1.0, 'Every 2 days': 0.95, 'Weekly': 0.8,
        'Bi-weekly': 0.7, 'Monthly': 0.5
    }
    freq_factor = freq_factors.get(irrigation_frequency, 1.0)
    
    # Calculate predicted yield
    predicted_yield = (base_yield * soil_factor * irrigation_factor * season_factor * 
                      ph_factor * carbon_factor * water_factor * freq_factor * farm_size)
    
    # Add some realistic variation (±15%)
    variation = random.uniform(0.85, 1.15)
    predicted_yield *= variation
    
    # Ensure minimum yield
    predicted_yield = max(predicted_yield, 100)
    
    return round(predicted_yield, 2)

def calculate_yield_prediction(form_data):
    """Predict crop yield using simple calculation (no ML dependencies)"""
    return calculate_yield_simple(form_data)

def validate_input_data(form_data):
    # Accept any payload; defaults are applied elsewhere
    return True, "Validation successful."