# 🚀 Manual Render Deployment Guide

Since the render.yaml approach is having issues, here's how to deploy manually through the Render dashboard:

## Step-by-Step Manual Deployment

### 1. Delete Existing Service (if any)
- Go to your Render dashboard
- Find the "krishisetu-backend" service
- Click on it → Settings → Delete Service

### 2. Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `CharviAggarwal02/sih_krishisetu`

### 3. Configure Service Settings
```
Name: krishisetu-api
Environment: Python 3
Region: Oregon (US West)
Branch: main
Root Directory: crop-yield-api
Build Command: pip install -r requirements.txt
Start Command: gunicorn --bind 0.0.0.0:$PORT run:app
```

### 4. Environment Variables
```
FLASK_ENV=production
```

### 5. Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)

## Alternative: Use Blueprint (Recommended)

1. Click "New +" → "Blueprint"
2. Connect your GitHub repository: `CharviAggarwal02/sih_krishisetu`
3. Render will automatically detect the render.yaml file
4. Click "Apply" to deploy

## Troubleshooting

If you still get directory errors:
1. Make sure the service name is different from previous attempts
2. Use "krishisetu-api" instead of "krishisetu-backend"
3. Ensure Root Directory is set to "crop-yield-api"

## Expected Result
Your API will be available at: `https://krishisetu-api.onrender.com`
