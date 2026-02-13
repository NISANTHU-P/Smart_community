# VERCEL DEPLOYMENT GUIDE

## ✅ ALL FIXES APPLIED

### Files Fixed:
1. ✅ `.env.production` - Correct API URL with /api path
2. ✅ `vercel.json` - Proper SPA routing + build config
3. ✅ `vite.config.js` - Build optimization for production
4. ✅ `index.html` - Removed missing vite.svg reference
5. ✅ `.env` - Local development config

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Build Locally (Test First)
```bash
cd frontend
npm run build
```
✅ Should create `dist` folder without errors

### Step 2: Test Production Build Locally
```bash
npm run preview
```
✅ Open http://localhost:4173 and test

### Step 3: Deploy to Vercel

#### Option A: Git Push (Recommended)
```bash
git add .
git commit -m "Fix Vercel deployment - all issues resolved"
git push
```
Vercel will auto-deploy from your connected repo.

#### Option B: Vercel CLI
```bash
npm i -g vercel
cd frontend
vercel --prod
```

---

## ⚙️ VERCEL DASHBOARD SETTINGS

Go to your Vercel project settings:

### 1. Build & Development Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2. Environment Variables
Add this in Vercel Dashboard → Settings → Environment Variables:

**Variable Name**: `VITE_API_URL`  
**Value**: `https://smart-community.onrender.com/api`  
**Environment**: Production

### 3. Root Directory
- If deploying from monorepo: Set to `frontend`
- If frontend is root: Leave empty

---

## 🔍 VERIFY BACKEND IS RUNNING

Before deploying frontend, ensure backend is live:

1. Visit: https://smart-community.onrender.com
2. Should see: `{"message": "Smart Community Service & Maintenance Management System API"}`
3. Test API: https://smart-community.onrender.com/api/auth/login

---

## 🐛 TROUBLESHOOTING

### Issue: "api is not defined" error
**Cause**: Environment variable not loaded  
**Fix**: Rebuild after setting `VITE_API_URL` in Vercel

### Issue: 404 on page refresh
**Cause**: Missing vercel.json rewrites  
**Fix**: Already fixed in vercel.json

### Issue: CORS errors
**Cause**: Backend not allowing frontend origin  
**Fix**: Add to backend `.env`:
```
FRONTEND_URL=https://your-app.vercel.app
```

### Issue: Blank page
**Cause**: Build errors or wrong base path  
**Fix**: Check Vercel build logs, ensure `base: '/'` in vite.config.js

---

## 📋 CHECKLIST BEFORE DEPLOY

- [ ] Backend is deployed and running on Render
- [ ] Backend API responds at `/api` routes
- [ ] `.env.production` has correct backend URL
- [ ] `npm run build` works locally without errors
- [ ] `vercel.json` exists in frontend root
- [ ] Environment variable set in Vercel dashboard
- [ ] Git changes committed and pushed

---

## 🎯 EXPECTED RESULT

After deployment:
- ✅ App loads at your-app.vercel.app
- ✅ Login page appears
- ✅ Can login with credentials
- ✅ Page refresh works (no 404)
- ✅ API calls reach backend
- ✅ No console errors

---

## 📞 STILL HAVING ISSUES?

1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify backend is responding
4. Clear browser cache
5. Redeploy with: `vercel --prod --force`

---

## 🔗 USEFUL LINKS

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html
