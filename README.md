
# Job Board SPA - Laravel & Vue.js

![Project Banner](https://raw.githubusercontent.com/saadel123/jobs-laravel-vue-ts/refs/heads/main/public/laravel-vue-job.gif)

A modern, responsive Job Board Single Page Application built with Laravel and Vue. It features user authentication, CRUD functionality, and a clean UI with dark mode support.

## Technology Stack

### Backend
- **Laravel 12** - PHP framework with elegant syntax
- **Sanctum API** - Lightweight authentication system for SPAs
- **RESTful Architecture** - Clean, standardized API endpoints

### Frontend
- **Vue 3** - JavaScript framework
- **TypeScript** - Type-safe development experience
- **Vuetify 3** - Material Design component framework
- **Pinia** - Modern state management solution
- **Vue Router** - Seamless client-side navigation

## Core Features

### Job Management
- **Complete CRUD Operations** for job postings
- **Search & Filtering** by job type and keywords
- **Fully Responsive Design** works on all devices
- **Dark/Light Mode** toggle support

### User Experience
- **Secure Authentication** powered by Laravel Sanctum
- **Real-time Updates** with no page reloads
- **Interactive UI** with smooth transitions and animations

### Development Advantages
- **Modular Component Architecture** for clean, reusable code
- **Type Safety** across frontend and backend
- **Form Validation** with clear error messages

## Installation Guide

### Prerequisites

| Software         | Version | Installation Guide                                              |
|------------------|---------|-----------------------------------------------------------------|
| PHP              | ≥ 8.2   | [php.net](https://www.php.net/download)                         |
| Composer         | Latest  | [getcomposer.org](https://getcomposer.org/download/)            |
| Node.js          | ≥ 18.x  | [nodejs.org](https://nodejs.org/)                                |
| MySQL/PostgreSQL | ≥ 5.7   | [mysql.com](https://dev.mysql.com/downloads/)                    |

### 1. Clone Repository

```bash
git clone https://github.com/saadel123/jobs-laravel-vue-ts.git
```

### 2. Environment Setup

```bash
cp .env.example .env
# After copying the .env file, clear the configuration and cache:
php artisan config:clear
php artisan cache:clear
```

Configure these key variables in `.env`:

```ini
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_db_name
DB_USERNAME=root
DB_PASSWORD=

```

### 3. Install Dependencies

```bash
# Backend
composer install

# Frontend
cd frontend
npm install
```

### 4. Application Setup

```bash
# Generate app key
php artisan key:generate

# Run migrations with seed
php artisan migrate --seed
```

_Default test user created:_
- **Email:** test@example.com
- **Password:** password

### 5. Start Development Servers

**Terminal 1 – Backend:**

```bash
php artisan serve
```

**Terminal 2 – Frontend:**
Navigate to the `frontend` directory and start the development server:
```bash
cd frontend
npm run dev
```