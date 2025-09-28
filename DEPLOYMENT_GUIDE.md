# 🚀 Krishisetu Backend Deployment Guide for Render

## Prerequisites
- GitHub account
- Render account (free tier available)
- Git installed on your local machine

## Step-by-Step Deployment Process

### 1. Prepare Your Repository
```bash
# Initialize git if not already done
cd /Users/god./Downloads/Dummy/sih_krishisetu
git init
git add .
git commit -m "Initial commit with backend ready for deployment"
```

### 2. Push to GitHub
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/krishisetu-backend.git
git branch -M main
git push -u origin main
```

### 3. Deploy on Render

#### Option A: Using Render Dashboard (Recommended)

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign up/Login with your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `krishisetu-backend` repository

3. **Configure Service Settings**
   ```
   Name: krishisetu-backend
   Environment: Python 3
   Region: Oregon (US West)
   Branch: main
   Root Directory: crop-yield-api
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn --bind 0.0.0.0:$PORT run:app
   ```

4. **Environment Variables** (Optional)
   ```
   FLASK_ENV=production
   PYTHONPATH=/opt/render/project/src
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (5-10 minutes)

#### Option B: Using render.yaml (Alternative)

1. **Push render.yaml to your repository** (already created)
2. **In Render Dashboard**
   - Click "New +" → "Blueprint"
   - Connect your repository
   - Render will automatically detect and use render.yaml

### 4. Verify Deployment

Once deployed, you'll get a URL like: `https://krishisetu-backend.onrender.com`

Test your endpoints:
```bash
# Health check
curl https://your-app-name.onrender.com/health

# API info
curl https://your-app-name.onrender.com/

# Test prediction (example)
curl -X POST https://your-app-name.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{
    "season": "Kharif",
    "crop": "Rice",
    "area": 100,
    "soilPH": 7.0,
    "organicCarbon": 1.0
  }'
```

### 5. Update Frontend Configuration

Update your frontend to use the deployed backend URL:

```typescript
// In your frontend code, update the API base URL
const API_BASE_URL = 'https://your-app-name.onrender.com';
```

## 🔧 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check that all dependencies are in requirements.txt
   - Ensure Python version compatibility

2. **App Crashes on Start**
   - Check the logs in Render dashboard
   - Verify the start command is correct

3. **CORS Issues**
   - Ensure CORS is properly configured in app/__init__.py
   - Check that origins are set correctly

4. **Import Errors**
   - Verify PYTHONPATH is set correctly
   - Check that all modules are in the correct directory

### Render Free Tier Limitations:
- Service sleeps after 15 minutes of inactivity
- Cold start takes 30-60 seconds
- 750 hours per month limit
- Automatic sleep/wake based on traffic

## 📁 Project Structure for Deployment

```
krishisetu-backend/
├── crop-yield-api/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── routes.py
│   │   └── utils.py
│   ├── requirements.txt
│   ├── run.py
│   └── start.sh
├── render.yaml
└── DEPLOYMENT_GUIDE.md
```

## 🎯 Next Steps

1. Deploy the backend following the steps above
2. Update your frontend to use the deployed backend URL
3. Test all endpoints thoroughly
4. Consider upgrading to a paid plan for production use

## 📞 Support

If you encounter issues:
1. Check Render logs in the dashboard
2. Verify all files are committed to GitHub
3. Ensure requirements.txt has all dependencies
4. Check that the start command is correct
