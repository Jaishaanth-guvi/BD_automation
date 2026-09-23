# 🚀 Stratis BD - Production Deployment Guide

This repository contains a full-stack Business Development Lead Management & Intelligence platform built with **React (Vite)**, **FastAPI (Python)**, and **MongoDB**, fully containerized with **Docker & Docker Compose**.

---

## 📋 Architecture Overview

- **Frontend**: React + Vite + Lucide Icons + Recharts (Port `4000`)
- **Backend API**: FastAPI + Uvicorn + Motor Async MongoDB Driver (Port `8001` / `8000`)
- **Database**: MongoDB 7.0 (Port `27018` / `27017` with persistent volume `mongo_data`)

---

## 🚀 Option 1: Single-Server VPS Deployment (AWS EC2 / DigitalOcean / Linode / Hetzner)

This is the recommended and easiest method using Docker Compose.

### Step 1: Provision a Linux Server
1. Create a VPS running **Ubuntu 22.04 LTS** (minimum 2 GB RAM recommended).
2. SSH into your server:
   ```bash
   ssh root@<your-server-ip>
   ```

### Step 2: Install Docker & Docker Compose
```bash
# Update package list and install prerequisites
sudo apt update && sudo apt install -y curl git ufw

# Install Docker
curl -fsSL https://get.docker.com | sh

# Enable and start Docker service
sudo systemctl enable --now docker

# Verify Docker installation
docker --version
docker compose version
```

### Step 3: Clone Repository & Launch Stack
```bash
# Clone project repository
git clone <your-repository-url> bd_dashboard
cd bd_dashboard

# Build and start all services in detached mode
docker compose up -d --build

# Check running containers
docker compose ps
```

All 3 containers (`bd_mongodb`, `bd_fastapi_backend`, `bd_react_frontend`) will start, and MongoDB will automatically seed the initial mock data.

---

### Step 4: Configure Nginx & SSL (Certbot)

To expose your app securely over standard domain names with HTTPS (`https://yourdomain.com`):

1. Install Nginx and Certbot:
   ```bash
   sudo apt install -y nginx certbot python3-certbot-nginx
   ```

2. Create an Nginx server block configuration (`/etc/nginx/sites-available/stratis_bd`):
   ```nginx
   server {
       server_name app.yourdomain.com;

       location / {
           proxy_pass http://localhost:4000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }

   server {
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:8001;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

3. Enable the site and restart Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/stratis_bd /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. Obtain Free SSL Certificate via Let's Encrypt:
   ```bash
   sudo certbot --nginx -d app.yourdomain.com -d api.yourdomain.com
   ```

---

## ☁️ Option 2: Serverless / Cloud Managed Hosting

### 1. Database: MongoDB Atlas (Cloud)
- Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- Get connection string URI: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/bd_dashboard_db?retryWrites=true&w=majority`

### 2. Backend: Render / Railway / Fly.io
- Push code to GitHub.
- Connect repository to **Render** or **Railway**.
- Set root directory to `backend/`.
- Set Environment Variables:
  - `MONGO_URI`: Your MongoDB Atlas URI.
  - `DB_NAME`: `bd_dashboard_db`
- Deploy Web Service.

### 3. Frontend: Vercel / Netlify
- Connect repository to **Vercel**.
- Build Command: `npm run build`
- Output Directory: `dist`
- Set `VITE_API_BASE_URL`: Your deployed FastAPI backend URL.

---

## ⚙️ Environment Variables Reference

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `MONGO_URI` | `mongodb://mongodb:27017` | Connection URI for MongoDB |
| `DB_NAME` | `bd_dashboard_db` | MongoDB Database Name |
| `API_BASE` | `http://localhost:8001/api` | API Base URL used by Frontend |

---

## 🛡️ Default Login Credentials
- **Username**: `admin` *(or `admoin`)*
- **Password**: `admin`
