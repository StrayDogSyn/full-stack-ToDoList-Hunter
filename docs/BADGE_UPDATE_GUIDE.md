# 📝 Badge Update Instructions - Vercel Deployment

## Quick Reference: Update These After Deploying

After you deploy your site to Vercel, update these placeholders in `README.md`:

### 1. Live Demo Badge

**Find this code in README.md:**
```markdown
[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=vercel)](https://your-app-name.vercel.app)
```

**Replace with:**
```markdown
[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=vercel)](https://ACTUAL-PROJECT-NAME.vercel.app)
```

**How to find your URL:**
- After deployment, Vercel shows your production URL
- Format: `https://your-project-name.vercel.app`
- Example: `https://straydog-todolist.vercel.app`

---

### 2. Portfolio Link (Optional)

**Find this code in README.md:**
```markdown
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://your-portfolio-url.com)
```

**Replace with your actual portfolio URL:**
```markdown
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-00C7B7?style=for-the-badge&logo=vercel&logoColor=white)](https://your-actual-portfolio.com)
```

Or remove this line if you don't have a portfolio yet.

---

## Step-by-Step Process

### After Vercel Deployment:

1. **Note Your Deployment URL**
   - Vercel shows your production URL after successful deployment
   - It will be in format: `https://project-name.vercel.app`
   - You can also find it in Vercel Dashboard → Your Project → Domains

2. **Update README.md**
   - Open `README.md` in VS Code
   - Use Find & Replace (Ctrl+H):
     - Find: `your-app-name.vercel.app` → Replace with your actual URL
     - Find: `your-portfolio-url.com` → Replace with your portfolio URL (or remove)

3. **Update HTML Meta Tags**
   - Open `frontend/public/index.html`
   - Find and replace:
     - `https://your-app-name.vercel.app/` → Your actual Vercel URL

4. **Commit and Push**
   ```bash
   git add README.md frontend/public/index.html
   git commit -m "Update badges and URLs with actual Vercel deployment"
   git push origin main
   ```

---

## Current Badge Status

- [ ] Live Demo Badge - **NEEDS UPDATE**
- [ ] Portfolio Link - **OPTIONAL/NEEDS UPDATE**
- [ ] HTML Meta Tags - **NEEDS UPDATE**

---

## Example (After Update)

**Before:**
```markdown
[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=vercel)](https://your-app-name.vercel.app)
```

**After:**
```markdown
[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=vercel)](https://straydog-todolist.vercel.app)
```

---

## Verification

After updating, verify your badges work:

1. View your README on GitHub
2. Click each badge to ensure they link correctly
3. The Live Demo badge should open your deployed application

---

## Custom Domain (Advanced)

If you set up a custom domain in Vercel:

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Update README badges with custom domain instead of `.vercel.app`

Example:
```markdown
[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=vercel)](https://todolist.yourdomain.com)
```

---

**Note**: It's okay to deploy first and update badges later. The app will work fine with placeholder badges. Update them when you're ready to share the project!
