# 🚀 Food Vision AI - Complete Hosting Guide

<div align="center">

![Deployment Ready](https://img.shields.io/badge/Deployment-Ready-green?style=for-the-badge)
![Production](https://img.shields.io/badge/Production-Ready-blue?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Supported-blue?style=for-the-badge)

**Complete guide to deploy Food Vision AI to production**

</div>

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] ✅ **Backend tested locally** - API responds correctly
- [ ] ✅ **Frontend built successfully** - `npm run build` works
- [ ] ✅ **Environment variables configured** - Production settings ready
- [ ] ✅ **Domain name ready** (optional) - For custom domain setup
- [ ] ✅ **GitHub repository** - Code pushed to GitHub
- [ ] ✅ **Account created** - On your chosen hosting platform

---

## 🌐 Hosting Platform Options

### 🥇 **Recommended: Vercel + Railway** (Easiest)

**Why this combination:**
- ✅ Zero configuration deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Free tiers available
- ✅ Easy custom domain setup

---

## 🎯 Option 1: Vercel + Railway (Recommended)

### Step 1: Deploy Backend to Railway

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your Food Vision AI repository

3. **Configure Backend**
   - Set **Root Directory**: `backend`
   - Set **Build Command**: `pip install -r requirements.txt`
   - Set **Start Command**: `python app.py`

4. **Environment Variables**
   ```
   FLASK_ENV=production
   HOST=0.0.0.0
   PORT=8000
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy the generated URL (e.g., `https://your-app.railway.app`)

### Step 2: Deploy Frontend to Vercel

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Set **Root Directory**: `frontend`

3. **Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. **Environment Variables**
   ```
   VITE_API_URL=https://your-app.railway.app
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Get your frontend URL (e.g., `https://your-app.vercel.app`)

### Step 3: Update CORS Settings

1. **Update Backend CORS**
   ```python
   # In backend/config.py
   CORS_ORIGINS = [
       'http://localhost:3000',
       'http://127.0.0.1:3000',
       'https://your-app.vercel.app'  # Add your Vercel URL
   ]
   ```

2. **Redeploy Backend**
   - Push changes to GitHub
   - Railway will auto-deploy

---

## 🎯 Option 2: Heroku (Full Stack)

### Step 1: Prepare for Heroku

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

### Step 2: Deploy Backend

1. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-foodvision-backend
   ```

2. **Create Procfile**
   ```bash
   echo "web: python app.py" > Procfile
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set FLASK_ENV=production
   heroku config:set HOST=0.0.0.0
   heroku config:set PORT=8000
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Step 3: Deploy Frontend

1. **Create Second Heroku App**
   ```bash
   cd frontend
   heroku create your-foodvision-frontend
   ```

2. **Create package.json Scripts**
   ```json
   {
     "scripts": {
       "start": "vite preview --port $PORT --host 0.0.0.0",
       "build": "vite build"
     }
   }
   ```

3. **Create Procfile**
   ```bash
   echo "web: npm start" > Procfile
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set VITE_API_URL=https://your-foodvision-backend.herokuapp.com
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy frontend to Heroku"
   git push heroku main
   ```

---

## 🎯 Option 3: DigitalOcean App Platform

### Step 1: Create App

1. **Go to DigitalOcean**
   - Visit [cloud.digitalocean.com](https://cloud.digitalocean.com)
   - Sign up/Login

2. **Create App**
   - Click "Create" → "Apps"
   - Connect your GitHub repository

### Step 2: Configure Backend

1. **Add Backend Service**
   - Click "Add Service" → "Web Service"
   - **Source Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Run Command**: `python app.py`

2. **Environment Variables**
   ```
   FLASK_ENV=production
   HOST=0.0.0.0
   PORT=8080
   ```

### Step 3: Configure Frontend

1. **Add Frontend Service**
   - Click "Add Service" → "Static Site"
   - **Source Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

2. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.ondigitalocean.app
   ```

---

## 🐳 Option 4: Docker Deployment

### Step 1: Create Dockerfile for Backend

```dockerfile
# backend/Dockerfile
FROM python:3.13-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "app.py"]
```

### Step 2: Create Dockerfile for Frontend

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Step 3: Create Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - FLASK_ENV=production
      - HOST=0.0.0.0
      - PORT=8000

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      - VITE_API_URL=http://localhost:8000
    depends_on:
      - backend
```

### Step 4: Deploy with Docker

```bash
# Build and run
docker-compose up --build

# Or deploy to cloud
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🔧 Environment Variables Reference

### Backend Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `FLASK_ENV` | Flask environment | `development` | Yes |
| `HOST` | Server host | `0.0.0.0` | Yes |
| `PORT` | Server port | `8000` | Yes |
| `MAX_IMAGE_SIZE` | Max upload size (bytes) | `10485760` | No |
| `CORS_ORIGINS` | Allowed origins | `localhost:3000` | Yes |

### Frontend Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000` | Yes |
| `VITE_APP_TITLE` | App title | `Food Vision AI` | No |

---

## 🌍 Custom Domain Setup

### Step 1: Get Domain

1. **Purchase Domain**
   - Use providers like Namecheap, GoDaddy, or Google Domains
   - Choose a memorable name (e.g., `foodvisionai.com`)

### Step 2: Configure DNS

1. **For Vercel (Frontend)**
   - Go to Vercel Dashboard → Project Settings → Domains
   - Add your domain
   - Update DNS records as instructed

2. **For Railway (Backend)**
   - Go to Railway Dashboard → Project → Settings → Domains
   - Add custom domain
   - Update DNS records

### Step 3: Update CORS

```python
# backend/config.py
CORS_ORIGINS = [
    'http://localhost:3000',
    'https://yourdomain.com',  # Add your domain
    'https://www.yourdomain.com'
]
```

---

## 📊 Performance Optimization

### Frontend Optimizations

1. **Build Optimization**
   ```bash
   # In frontend/
   npm run build
   # This creates optimized production build
   ```

2. **Image Optimization**
   - Use WebP format when possible
   - Compress images before upload
   - Implement lazy loading

3. **Caching Strategy**
   - Set appropriate cache headers
   - Use CDN for static assets
   - Implement service worker

### Backend Optimizations

1. **Production Server**
   ```python
   # Use Gunicorn for production
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:8000 app:app
   ```

2. **Model Caching**
   - Model loads once on startup
   - Cached in memory for fast predictions
   - Consider Redis for multiple instances

3. **Image Processing**
   - Resize images before processing
   - Use efficient image formats
   - Implement request queuing

---

## 🔍 Monitoring and Maintenance

### Health Monitoring

1. **Backend Health Check**
   ```bash
   curl https://your-backend-url.com/api/health
   ```

2. **Set up Monitoring**
   - Use services like UptimeRobot
   - Monitor response times
   - Set up alerts for downtime

### Log Management

1. **Backend Logs**
   ```python
   # Add logging to app.py
   import logging
   logging.basicConfig(level=logging.INFO)
   ```

2. **Frontend Error Tracking**
   - Use Sentry for error tracking
   - Monitor user interactions
   - Track performance metrics

### Backup Strategy

1. **Code Backup**
   - Use Git for version control
   - Regular commits and pushes
   - Tag releases

2. **Data Backup**
   - Model cache is auto-downloaded
   - No persistent data to backup
   - Configuration in environment variables

---

## 💰 Cost Estimation

### Free Tiers

| Platform | Backend | Frontend | Limitations |
|----------|---------|----------|-------------|
| **Railway** | ✅ Free | ❌ | 500 hours/month |
| **Vercel** | ❌ | ✅ Free | 100GB bandwidth |
| **Heroku** | ✅ Free | ✅ Free | 550-1000 dyno hours |
| **DigitalOcean** | ❌ | ❌ | $5/month minimum |

### Paid Plans

| Platform | Backend Cost | Frontend Cost | Total |
|----------|--------------|---------------|-------|
| **Railway + Vercel** | $5/month | Free | $5/month |
| **Heroku** | $7/month | $7/month | $14/month |
| **DigitalOcean** | $5/month | $5/month | $10/month |

---

## 🚨 Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   ```bash
   # Check build logs
   # Ensure all dependencies are in requirements.txt
   # Verify Python/Node.js versions
   ```

2. **CORS Errors**
   ```python
   # Update CORS_ORIGINS in config.py
   # Include your production domain
   # Redeploy backend
   ```

3. **Environment Variables**
   ```bash
   # Check all required variables are set
   # Verify variable names and values
   # Restart services after changes
   ```

4. **Model Download Issues**
   ```bash
   # Check internet connection
   # Verify disk space (1GB+ needed)
   # Check Hugging Face Hub status
   ```

### Performance Issues

1. **Slow Predictions**
   - Check server resources
   - Consider upgrading plan
   - Optimize image sizes

2. **Memory Issues**
   - Monitor RAM usage
   - Consider CPU-only inference
   - Implement request queuing

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] ✅ **Frontend loads correctly** - No console errors
- [ ] ✅ **Backend API responds** - Health check passes
- [ ] ✅ **Image upload works** - Can upload and get predictions
- [ ] ✅ **CORS configured** - No cross-origin errors
- [ ] ✅ **HTTPS enabled** - Secure connection
- [ ] ✅ **Custom domain works** - If using custom domain
- [ ] ✅ **Performance acceptable** - Predictions under 3 seconds
- [ ] ✅ **Mobile responsive** - Works on mobile devices

---

## 🆘 Getting Help

### Support Resources

1. **Documentation**
   - [Flask Documentation](https://flask.palletsprojects.com/)
   - [React Documentation](https://react.dev/)
   - [Vite Documentation](https://vitejs.dev/)

2. **Community**
   - [GitHub Issues](https://github.com/yourusername/foodvisionai/issues)
   - [Stack Overflow](https://stackoverflow.com/)
   - [Discord Communities](https://discord.gg/)

3. **Platform Support**
   - [Vercel Support](https://vercel.com/support)
   - [Railway Support](https://railway.app/support)
   - [Heroku Support](https://help.heroku.com/)

---

## 🎉 Congratulations!

You've successfully deployed Food Vision AI to production! 

**Next Steps:**
- Share your deployed app
- Monitor performance
- Gather user feedback
- Consider adding new features

**Remember to:**
- Keep your dependencies updated
- Monitor your hosting costs
- Backup your configuration
- Test regularly

---

<div align="center">

**Happy Deploying! 🚀**

*Need help? Open an issue or reach out to the community.*

</div>