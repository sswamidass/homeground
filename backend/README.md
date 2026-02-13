# Backend - WordPress

This directory contains the WordPress installation and configuration for Homeground's content management system.

## Structure

```
backend/
├── wordpress/               # WordPress core files
├── scripts/                 # Setup and migration scripts
├── docker-compose.yml       # Docker configuration
└── .env                     # Environment variables
```

## Setup

### Prerequisites

- Docker and Docker Compose installed
- Port 8000 and 3306 available

### Running WordPress

1. Navigate to this directory:
```bash
cd backend
```

2. Start the Docker containers:
```bash
docker-compose up -d
```

3. WordPress will be available at: **http://localhost:8000**

### Initial Setup

When first starting, WordPress will guide you through the setup process at `http://localhost:8000/wp-admin/install.php`

### Accessing WordPress Admin

- URL: `http://localhost:8000/wp-admin`
- Default username and password are configured in `.env`

## Custom Post Types

The `wp-content/plugins/homeground-content.php` plugin registers three custom post types:

- **Books** (`hg_book`) - Children's books with Great Lakes themes
- **Coffee** (`hg_coffee`) - Artisan coffee roasters
- **Monthly Boxes** (`hg_monthly_box`) - Curated monthly subscription content

## REST API

All content is exposed through the WordPress REST API:

- Books: `/wp-json/wp/v2/hg_book`
- Coffee: `/wp-json/wp/v2/hg_coffee`
- Monthly Boxes: `/wp-json/wp/v2/hg_monthly_box`

The React frontend fetches data from these endpoints.

## Database

- Database: MySQL 8.0 (Docker container)
- Data is persisted in a Docker volume
- Backup WordPress data with: `docker-compose exec db mysqldump -u root -ppassword wordpress > backup.sql`

## Stopping WordPress

```bash
docker-compose down
```

To remove all data and start fresh:
```bash
docker-compose down -v
```
