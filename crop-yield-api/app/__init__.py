from flask import Flask, request, jsonify
from flask_cors import CORS

# Import utils robustly in both execution modes
try:
    # Prefer absolute import when available (flask run with FLASK_APP=app)
    from app.utils import calculate_yield_prediction, validate_input_data  # type: ignore
except Exception:
    try:
        # Fallback to relative import when running as script
        from .utils import calculate_yield_prediction, validate_input_data  # type: ignore
    except Exception:  # pragma: no cover
        # Final fallback: adjust sys.path for direct script execution
        from pathlib import Path
        import sys
        current_dir = Path(__file__).resolve().parent
        if str(current_dir) not in sys.path:
            sys.path.insert(0, str(current_dir))
        from utils import calculate_yield_prediction, validate_input_data  # type: ignore

app = Flask(__name__)
CORS(app, origins=["*"])  # Enable CORS for all routes and origins

@app.route('/')
def index():
    return jsonify({
        'status': 'ok',
        'message': 'Krishi crop-yield API running with ML prediction',
        'endpoints': {
            'POST /predict': 'Submit form data to get ML-based predicted_yield',
            'GET /health': 'Health check endpoint'
        }
    })

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'message': 'API is running successfully'
    })

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    # Validate input data
    # Fill sensible defaults to reduce client-side requirements
    if 'season' not in data or not data['season']:
        data['season'] = 'Kharif'
    if 'soilPH' in data and data['soilPH'] == '':
        data['soilPH'] = 7.0
    if 'organicCarbon' in data and data['organicCarbon'] == '':
        data['organicCarbon'] = 1.0

    is_valid, message = validate_input_data(data)
    if not is_valid:
        return jsonify({'error': message}), 400
    
    # Get ML-based prediction
    predicted_yield = calculate_yield_prediction(data)
    
    return jsonify({
        'predicted_yield': predicted_yield,
        'message': 'ML-based prediction completed successfully'
    })

if __name__ == '__main__':
    # Run without the reloader to avoid import context issues on Windows
    app.run(host='127.0.0.1', port=5000, debug=False, use_reloader=False)