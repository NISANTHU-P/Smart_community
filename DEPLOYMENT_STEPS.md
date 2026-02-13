# 🚀 Deploy to Vercel (Frontend) + Render (Backend)

## PART 1: Setup MongoDB Atlas (Database)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and sign up
3. Create a free M0 cluster (select AWS, nearest region)
4. Wait 3-5 minutes for cluster creation

### Step 2: Setup Database Access
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Username: `admin`
4. Password: Click "Autogenerate Secure Password" (SAVE THIS!)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

### Step 3: Setup Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 4: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Click "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/`)
5. Replace `<password>` with your actual password
6. Add database name at the end: `mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/smart_community`
7. **SAVE THIS CONNECTION STRING!**

---

## PART 2: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment
1. Open `backend/server.js` and update CORS:
```javascript
// Replace the CORS section with:
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

2. Create `backend/.gitignore` if not exists:
```
node_modules
.env
```

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (recommended) or email
3. Verify your email

### Step 3: Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository (or use "Public Git repository" and paste your repo URL)
3. If using GitHub: Authorize Render and select your repository
4. Configure:
   - **Name**: `smart-community-backend`
   - **Region**: Select nearest
   - **Branch**: `main` (or `master`)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

5. Click "Advanced" → "Add Environment Variable" and add:
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `your_mongodb_atlas_connection_string`
   - `JWT_SECRET` = `your_random_64_character_secret_key`
   - `JWT_EXPIRE` = `7d`

6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
8. **COPY YOUR BACKEND URL** (e.g., `https://smart-community-backend.onrender.com`)

### Step 4: Seed Database
1. After deployment succeeds, click "Shell" tab in Render dashboard
2. Run: `npm run seed`
3. You should see "5 users created successfully"

---

## PART 3: Deploy Frontend to Vercel

### Step 1: Update Frontend API URL
1. Open `frontend/src/services/api.js`
2. Update the baseURL:
```javascript
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

3. Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```
Replace with your actual Render backend URL.

### Step 2: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub (recommended)
3. Authorize Vercel

### Step 3: Deploy Frontend
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Click "Environment Variables" and add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com/api`

5. Click "Deploy"
6. Wait 2-3 minutes
7. **COPY YOUR FRONTEND URL** (e.g., `https://smart-community.vercel.app`)

---

## PART 4: Update Backend CORS

### Step 1: Add Frontend URL to Backend
1. Go to Render dashboard → Your backend service
2. Click "Environment" tab
3. Add new environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://your-frontend-url.vercel.app`
4. Click "Save Changes"
5. Service will automatically redeploy

---

## PART 5: Test Deployment

### Step 1: Test Login
1. Open your Vercel frontend URL
2. Try logging in with:
   - Email: `admin@example.com`
   - Password: `password123`

### Step 2: Test All Features
- ✅ Login works
- ✅ Dashboard loads
- ✅ Create user (Admin)
- ✅ Create complaint (Resident)
- ✅ Notifications work
- ✅ Mobile responsive

---

## 🔧 TROUBLESHOOTING

### Issue: "Network Error" or CORS Error
**Solution:**
1. Check backend logs in Render
2. Verify FRONTEND_URL is set correctly
3. Make sure CORS is configured properly in server.js

### Issue: "Cannot connect to database"
**Solution:**
1. Check MONGODB_URI in Render environment variables
2. Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
3. Check if password has special characters (URL encode them)

### Issue: Frontend shows blank page
**Solution:**
1. Check browser console (F12) for errors
2. Verify VITE_API_URL is set correctly in Vercel
3. Redeploy frontend

### Issue: Backend takes long to respond (first request)
**Solution:**
- Render free tier sleeps after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- This is normal for free tier

---

## 📝 IMPORTANT URLS TO SAVE

After deployment, save these:
- **Frontend URL**: `https://your-app.vercel.app`
- **Backend URL**: `https://your-backend.onrender.com`
- **MongoDB Atlas**: `https://cloud.mongodb.com`
- **Render Dashboard**: `https://dashboard.render.com`
- **Vercel Dashboard**: `https://vercel.com/dashboard`

---

## 🎉 DEPLOYMENT COMPLETE!

Your app is now live and accessible worldwide!

**Login Credentials:**
- Admin: admin@example.com / password123
- Resident: resident@example.com / password123
- Staff: staff@example.com / password123

---

## 💡 TIPS

1. **Free Tier Limitations:**
   - Render: Backend sleeps after 15 min inactivity
   - Vercel: 100GB bandwidth/month
   - MongoDB Atlas: 512MB storage

2. **Custom Domain:**
   - Vercel: Settings → Domains → Add your domain
   - Render: Settings → Custom Domain

3. **Monitoring:**
   - Check Render logs for backend errors
   - Check Vercel logs for frontend errors
   - Monitor MongoDB Atlas for database usage

4. **Updates:**
   - Push to GitHub → Auto-deploys to Vercel & Render
   - Or manually redeploy from dashboards
