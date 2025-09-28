# KrishiSetu – Crop Yield Prediction (Frontend + Backend)

AI-powered crop yield prediction app with a React + Vite frontend and a Flask backend (with an ML model using scikit-learn). Odisha is supported out-of-the-box with a curated district list.

## Features
- React + TypeScript (Vite), Tailwind styles
- Flask API with CORS enabled
- ML-based yield prediction (RandomForestRegressor) with sensible defaults
- Odisha-only state selection and district list in the form
- Dockerfiles and docker-compose for production-ready builds

## Project Structure
```
.
├─ crop-yield-api/              # Flask backend
│  ├─ app/
│  │  ├─ __init__.py           # API and routes
│  │  ├─ utils.py              # ML model + helpers
│  │  └─ models.py             # (optional) SQLAlchemy models
│  ├─ run.py                   # Stable backend entrypoint
│  └─ requirements.txt
├─ src/                         # React app source
│  └─ components/
│     └─ CropPrediction.tsx    # Form + API call
├─ frontend/Dockerfile          # Build static site with Nginx
├─ backend/Dockerfile           # Run Flask backend
└─ docker-compose.yml           # One-command up
```

## Quick Start – Local (Windows/PowerShell)
1) Backend
```powershell
cd crop-yield-api
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python run.py
```
- Backend runs at: http://127.0.0.1:5000/

2) Frontend
```powershell
npm install
npm run dev
```
- App runs at the Vite URL (e.g., http://localhost:5173/)

## API
- POST `http://127.0.0.1:5000/predict`
- Body (JSON – minimal fields are accepted; others are optional):
```json
{
  "state": "Odisha",
  "district": "Bhubaneswar",
  "farmSize": "2",
  "cropName": "Rice",
  "season": "Kharif",
  "soilType": "Clay",
  "irrigationSource": "Tube Well",
  "irrigationFrequency": "Daily",
  "soilPH": "6.8",
  "organicCarbon": "1.2",
  "waterAvailability": "Good"
}
```
- Response:
```json
{ "predicted_yield": 1234.56 }
```

## Docker (recommended)
Build and run both services:
```bash
docker compose up --build -d
```
- Frontend: http://localhost:5173/
- Backend:  http://127.0.0.1:5000/

## Notes
- If you change backend code locally, prefer `python run.py` over running `app/__init__.py` directly.
- The ML model auto-creates and caches artifacts on first request (in `crop-yield-api/app`).

## License
MIT
