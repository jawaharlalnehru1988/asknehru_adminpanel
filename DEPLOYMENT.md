# AskNehru Admin Panel - Deployment Guide

## Quick Access
**URL**: https://admin.asknehru.com
**Login**: Use any valid user credentials from the backend

## Architecture
- **Frontend**: React 18 static site
- **Backend API**: https://api.asknehru.com/api
- **Build Location**: /var/www/asknehru-admin/build/
- **Nginx Config**: /etc/nginx/sites-available/admin.asknehru

## Rebuild & Deploy
```bash
cd /var/www/asknehru-admin
npm run build
sudo systemctl reload nginx
```

## API Endpoints Used
- POST /api/auth/login
- GET /api/conversations
- POST /api/conversations
- PUT /api/conversations/:id
- DELETE /api/conversations/:id

## Features
✅ JWT Authentication
✅ Create/Edit/Delete Conversations
✅ Responsive table view
✅ Form validation
✅ SSL encryption

## SSL Certificate
- Provider: Let's Encrypt
- Auto-renewal: Enabled via certbot
- Expires: Check with `sudo certbot certificates`
