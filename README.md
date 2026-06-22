# AskNehru Admin Panel

React admin frontend for admin.asknehru.com.

## Development

```bash
npm install
npm start
```

## Build

```bash
cd /var/www/asknehru-platform/admin
npm ci
npm run build
```

Production build output:

```text
/var/www/asknehru-platform/admin/build
```

## Deployment

This app is served statically by nginx.

Site config:

```text
/etc/nginx/sites-available/admin.asknehru
```

Current production deploy path:

```bash
cd /var/www/asknehru-platform/admin
git pull origin master
npm ci
npm run build
sudo systemctl reload nginx
```
