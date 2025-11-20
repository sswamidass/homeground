# Railway Deployment for Homeground WordPress Site

## Prerequisites
1. Create a free account at [Railway.app](https://railway.app)
2. Install Railway CLI (optional): `npm i -g @railway/cli`

## Deployment Steps

### Option 1: Deploy via Railway Dashboard (Easiest)

1. **Go to [Railway.app](https://railway.app)** and sign in with GitHub
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose** `sswamidass/homeground` repository
5. **Railway will auto-detect** the Dockerfile
6. **Add a MySQL Database**:
   - Click "New" → "Database" → "Add MySQL"
   - Railway will automatically create a database
7. **Set Environment Variables**:
   - Click on your WordPress service
   - Go to "Variables" tab
   - Add these variables:
     ```
     WORDPRESS_DB_HOST=${{MySQL.MYSQL_URL}}
     WORDPRESS_DB_USER=${{MySQL.MYSQL_USER}}
     WORDPRESS_DB_PASSWORD=${{MySQL.MYSQL_PASSWORD}}
     WORDPRESS_DB_NAME=${{MySQL.MYSQL_DATABASE}}
     ```
8. **Deploy**: Railway will automatically build and deploy
9. **Get your URL**: Click "Settings" → "Generate Domain"

### Option 2: Deploy via Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Add MySQL database
railway add --database mysql

# Deploy
railway up

# Generate domain
railway domain
```

## After Deployment

1. **Visit your Railway URL** (e.g., `yourapp.up.railway.app`)
2. **Complete WordPress setup** wizard
3. **Login to wp-admin** at `yourapp.up.railway.app/wp-admin`
4. **Activate the Homeground theme**:
   - Appearance → Themes → Activate "Homeground"
5. **Set homepage**: Settings → Reading → Select "A static page" → Choose "Home"

## Important Notes

- **Free tier**: Railway offers $5/month credit (should cover small traffic)
- **Database**: MySQL is automatically configured
- **Custom domain**: You can add your own domain in Railway settings
- **Backups**: Railway doesn't include automatic backups on free tier
- **Environment**: All WordPress data is managed through Railway's dashboard

## Troubleshooting

If deployment fails:
1. Check Railway build logs
2. Verify MySQL database is running
3. Check environment variables are set correctly
4. Ensure Dockerfile.railway exists in root directory

## Alternative: Render.com

If you prefer Render.com (also has free tier):

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Use Docker environment
5. Add PostgreSQL or MySQL database
6. Set environment variables similar to Railway

## Cost Comparison

- **Railway**: $5/month credit (free tier) → ~$5-20/month paid
- **Render**: Free tier available → $7+/month paid
- **DigitalOcean**: $4/month (cheapest WordPress droplet)
- **Traditional hosting**: Bluehost/SiteGround $3-10/month
