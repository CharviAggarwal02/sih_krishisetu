# Crop Yield Prediction API

This project is a Flask-based API for predicting crop yields based on various input parameters. It provides endpoints to accept farm and crop information and returns predictions based on the provided data.

## Project Structure

```
crop-yield-api
├── app
│   ├── __init__.py        # Initializes the Flask application
│   ├── routes.py          # Defines API endpoints for crop yield prediction
│   ├── models.py          # Contains data models and prediction logic
│   └── utils.py           # Utility functions for data processing
├── tests
│   └── test_routes.py     # Unit tests for the API routes
├── requirements.txt       # Lists project dependencies
├── .gitignore             # Specifies files to ignore in version control
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd crop-yield-api
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. **Install the required dependencies:**
   ```
   pip install -r requirements.txt
   ```

5. **Run the application:**
   ```
   flask run
   ```

## Usage

Once the API is running, you can send a POST request to the `/predict` endpoint with the required parameters to get crop yield predictions. 

### Example Request

```json
{
  "state": "Maharashtra",
  "district": "Pune",
  "village": "Sample Village",
  "pincode": "411001",
  "farmSize": 2,
  "unit": "Hectare",
  "cropName": "Rice",
  "variety": "Hybrid",
  "sowingDate": "2023-06-01",
  "season": "Kharif",
  "soilType": "Alluvial",
  "fertilizerType": "NPK",
  "soilPH": 6.5,
  "organicCarbon": 0.75,
  "irrigationSource": "Canal",
  "irrigationFrequency": "Weekly",
  "waterAvailability": "Adequate"
}
```

### Example Response

```json
{
  "predicted_yield": 3000
}
```

## Testing

To run the tests, ensure your virtual environment is activated and run:

```
pytest tests/test_routes.py
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.