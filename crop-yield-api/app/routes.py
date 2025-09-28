from flask import Blueprint, request, jsonify
from .utils import predict_yield

api = Blueprint('api', __name__)

@api.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    required_fields = [
        'state', 'district', 'village', 'pincode', 
        'farmSize', 'unit', 'cropName', 'variety', 
        'sowingDate', 'season', 'soilType', 
        'fertilizerType', 'soilPH', 'organicCarbon', 
        'irrigationSource', 'irrigationFrequency', 
        'waterAvailability'
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    prediction = predict_yield(data)
    
    return jsonify({'predicted_yield': prediction})