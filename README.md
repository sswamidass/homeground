# Homeground - Great Lakes Stories

A full-stack application combining a React frontend with a WordPress backend, celebrating the culture and stories of the Great Lakes region.

## Project Structure

```
homeground/
├── frontend/                    # React + Vite application
│   ├── src/                     # React components and pages
│   ├── public/                  # Static assets (logo, images)
│   ├── index.html               # HTML entry point
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.ts           # Vite configuration
│   ├── tsconfig.json            # TypeScript configuration
│   └── eslint.config.js         # ESLint configuration
│
├── backend/                     # WordPress installation
│   ├── wordpress/               # WordPress core files
│   ├── scripts/                 # WordPress setup and migration scripts
│   ├── docker-compose.yml       # Docker configuration for WordPress + MySQL
│   └── .env                     # Environment variables for WordPress
│
├── docs/                        # Documentation
│   └── README.md                # Full documentation
│
├── .env                         # Shared environment variables
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

## Development

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on **http://localhost:5173**

### Backend (WordPress)

```bash
cd backend
docker-compose up -d
```

WordPress runs on **http://localhost:8000**

## Architecture

- **Frontend**: React 19 with TypeScript, Vite, React Router
- **Backend**: WordPress with custom plugin for content management
- **API**: WordPress REST API consumed by React frontend
- **Database**: MySQL 8.0 (Docker)

## Content Management

Content is managed in WordPress and fetched via REST API by the React frontend:
- Books (custom post type: `hg_book`)
- Coffee Roasters (custom post type: `hg_coffee`)
- Monthly Boxes (custom post type: `hg_monthly_box`)

## Deployment

See [docs/README.md](docs/README.md) for detailed deployment instructions.
