# 🚀 Deployment Guide

## ⚠️ IMPORTANT: Platform Migration

**This project has been migrated from Netlify to Vercel Pro.**

For complete, up-to-date deployment instructions, please see:

📘 **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Complete Vercel deployment guide

---

## Quick Links

- **Full Deployment Guide**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **Badge Update Instructions**: [BADGE_UPDATE_GUIDE.md](./BADGE_UPDATE_GUIDE.md)
- **Main README**: [README.md](./README.md)

---

## Legacy: Netlify Information (Deprecated)

The following information is kept for reference only. **Do not use for new deployments.**

### 1. Update README Badges (OLD - Netlify)
```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)
```

**How to get your Site ID:**
1. Go to your Netlify dashboard
2. Select your site
3. Go to Site settings → General
4. Copy your API ID (Site ID)
5. Replace `YOUR-SITE-ID` in the badge URL
6. Replace `YOUR-SITE-NAME` with your site name

#### Live Demo Badge
```markdown
[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=netlify)](https://your-app-name.netlify.app)
```

Replace `https://your-app-name.netlify.app` with your actual Netlify URL.

#### Portfolio Link
```markdown
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://your-portfolio-url.com)
```

Replace `https://your-portfolio-url.com` with your actual portfolio URL.

---

## Netlify Deployment Steps

### Option 1: GitHub Integration (Recommended)

1. **Push Your Code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Log in to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select "GitHub" and authorize
   - Choose your repository: `StrayDogSyn/full-stack-ToDoList-Hunter`

3. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `CI= npm run build`
   - **Publish directory**: `frontend/build`
   - **Node version**: `18`

4. **Environment Variables** (if needed)
   - Go to Site settings → Environment variables
   - Add any required variables:
     - `REACT_APP_API_URL`: Your backend API URL

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify in your project
netlify init

# Build the frontend
npm run build:frontend

# Deploy to production
netlify deploy --prod
```

---

## Post-Deployment Checklist

### ✅ Verify Deployment

- [ ] Site loads correctly at Netlify URL
- [ ] All assets (CSS, JS, images) load properly
- [ ] Screenshots are visible
- [ ] Responsive design works on mobile
- [ ] All links in README are functional
- [ ] Netlify badge shows "success" status

### ✅ Update Documentation

- [ ] Replace Netlify badge placeholders with actual site ID
- [ ] Update live demo link with actual URL
- [ ] Add portfolio link if available
- [ ] Test all README links

### ✅ Portfolio Integration

- [ ] Add project to portfolio with live demo link
- [ ] Include project description
- [ ] Add screenshots to portfolio
- [ ] Link to GitHub repository
- [ ] Highlight key technologies used

### ✅ SEO & Metadata

- [ ] Update `public/manifest.json` with correct site name
- [ ] Add meta tags in `public/index.html`
- [ ] Create a custom domain (optional)
- [ ] Set up SSL certificate (Netlify provides free SSL)

---

## Troubleshooting

### Build Failures

**Issue**: Build fails with `npm ERR!` messages

**Solution**:
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Try building locally first
npm run build:frontend
```

### 404 Errors on Refresh

**Issue**: Page refreshes return 404 errors

**Solution**: The `netlify.toml` file already includes the correct redirect rules:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Assets Not Loading

**Issue**: CSS or images not loading

**Solution**: Ensure your `package.json` has:
```json
{
  "homepage": "."
}
```

Or use environment variables:
```env
PUBLIC_URL=https://your-site-name.netlify.app
```

### Environment Variables Not Working

**Issue**: API calls failing in production

**Solution**:
1. Go to Netlify Site settings → Environment variables
2. Add all required variables (must start with `REACT_APP_` for React)
3. Trigger a new deploy

---

## Backend Deployment (Optional)

If you need to deploy the backend API:

### Recommended Services

1. **Render** (Free tier available)
   - Easy deployment
   - Automatic HTTPS
   - Environment variables support

2. **Railway** (Free tier available)
   - GitHub integration
   - Automatic deployments
   - Good for Node.js apps

3. **Heroku** (Paid)
   - Well-documented
   - Easy scaling
   - Add-ons available

### Backend Deployment Steps

1. Choose a platform
2. Connect your repository
3. Set environment variables:
   - `MONGODB_URI`
   - `PORT`
   - `NODE_ENV=production`
4. Deploy
5. Update frontend `REACT_APP_API_URL` to point to deployed backend

---

## Custom Domain (Optional)

### Add Custom Domain to Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow instructions to:
   - Add DNS records at your domain registrar
   - Verify domain ownership
   - Enable HTTPS (automatic)

---

## Monitoring & Analytics

### Netlify Analytics
- Enable in Site settings → Analytics
- Track page views, bandwidth, and more

### Google Analytics (Optional)
- Add tracking code to `public/index.html`
- Monitor user behavior and traffic

---

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm outdated
npm update

# Rebuild and redeploy
npm run build:frontend
git push origin main  # Auto-deploys via Netlify
```

### Security

- [ ] Keep dependencies updated
- [ ] Monitor for security vulnerabilities: `npm audit`
- [ ] Review Netlify logs regularly
- [ ] Enable 2FA on Netlify account

---

## Support

For deployment issues:
- Netlify Documentation: https://docs.netlify.com
- Netlify Support: https://support.netlify.com
- Project Issues: https://github.com/StrayDogSyn/full-stack-ToDoList-Hunter/issues

---

**Last Updated**: October 26, 2025
