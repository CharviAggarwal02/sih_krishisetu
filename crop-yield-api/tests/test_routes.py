from app import app
import json

def test_predict_yield(client):
    response = client.post('/predict', 
                            data=json.dumps({
                                "state": "Odisha",
                                "district": "puri",
                                "village": "puri",
                                "pincode": "411001",
                                "farmSize": "2",
                                "unit": "Hectare",
                                "cropName": "Rice",
                                "variety": "Hybrid",
                                "sowingDate": "2023-06-01",
                                "season": "Kharif",
                                "soilType": "Alluvial",
                                "fertilizerType": "NPK",
                                "soilPH": "6.5",
                                "organicCarbon": "0.75",
                                "irrigationSource": "Canal",
                                "irrigationFrequency": "Weekly",
                                "waterAvailability": "Adequate"
                            }), 
                            content_type='application/json')
    
    assert response.status_code == 200
    assert 'predicted_yield' in response.get_json()