# 💎 LuxeWear — Premium E-Commerce Clothing Platform

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Welcome to **LuxeWear**, a state-of-the-art, high-performance, and fully internationalized e-commerce platform built with modern web standards and enterprise-grade architecture. Designed for elegance, scalability, and premium shopping experiences.

---

## 🚀 Key Features

### 🌍 Internationalization (i18n) & Localization
- **Multi-language Support**: Built-in dynamic routing for English (`en`) and Arabic (`ar`).
- **RTL & LTR Layouts**: Automatic layout adjustments and directionality switching based on active locale.
- **Type-safe Dictionaries**: Complete localized translations for navigation, catalog, cart, checkout, auth, and admin dashboards.

### 🛍️ Premium Shopping Experience
- **Elegant UI/UX**: Crafted with Tailwind CSS v4, Glassmorphism elements, vibrant gradients, and Next Themes (Dark/Light mode).
- **Framer Motion Animations**: Smooth page transitions, micro-animations, and interactive hover states.
- **Zustand Cart Sheet**: Persistent, sliding cart drawer for seamless item updates and checkout transitions.
- **Dynamic Catalog & Filtering**: Instant client/server filtering by category, max price, size, and color.

### 🔐 Security & Authentication
- **NextAuth.js v5 (Beta)**: Secure, cookie-based authentication supporting credentials and role-based authorization.
- **Role Management**: Dedicated access controls distinguishing `CUSTOMER` and `ADMIN` users.
- **Robust Form Validation**: React Hook Form paired with Zod schemas for impenetrable client and server-side validation.

### 📊 Enterprise Admin Suite
- **Live Stats Overview**: Real-time KPI tracking for revenue, order volume, product catalog size, and user registrations.
- **Full CRUD Management**: Fully integrated managers for Products, Categories, and Orders.
- **Status Updates**: Instant lifecycle management for customer orders (Pending, Processing, Shipped, Delivered, Cancelled).

---

## 🏗️ Architecture & Domain-Driven Design (DDD)

LuxeWear follows a strict **Domain-Driven Design (DDD)** folder architecture to ensure modularity, maintainability, and clean separation of concerns across complex business domains.

```
src/
├── app/                  # Next.js App Router (Pages, API Routes, Layouts)
│   ├── [lang]/           # Internationalized Routes
│   └── api/              # Backend API Endpoints
├── core/                 # Shared Infrastructure & Foundations
│   ├── components/       # Global UI Elements (Navbar, Footer, Providers)
│   ├── i18n/             # Dictionary Handlers & Translations
│   └── lib/              # Core Service Clients (Prisma, Redis, Cloudinary)
└── features/             # Bounded Business Contexts (DDD)
    ├── admin/            # Admin Management Suite
    ├── auth/             # Authentication & User Sessions
    ├── cart/             # Shopping Cart State & Storage
    ├── catalog/          # Product Catalog, Categories & Search
    └── checkout/         # Order Placement & Payment Processing
```

Each feature module is internally subdivided into:
- `application/`: Application services, state stores, and business workflows.
- `domain/`: Data types, interfaces, validations, and domain logic.
- `presentation/`: UI components, forms, and views specific to that feature.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Full-stack React application framework |
| **Language** | React 19 & TypeScript | Static typing and cutting-edge React features |
| **Styling** | Tailwind CSS v4 & Framer Motion | Modern utility-first styling and fluid animation engine |
| **State** | Zustand | Fast, lightweight, and scalable global state management |
| **Database** | PostgreSQL & Prisma ORM | Relational database storage with robust type-safe ORM |
| **Caching** | Redis (`ioredis`) | High-speed caching and background store optimization |
| **Media Storage** | Cloudinary | Cloud asset management and image optimization |
| **Validation** | Zod & React Hook Form | Schema-first form handling and data validation |
| **Container** | Docker & Docker Compose | Multi-container local and production deployment |

---

## 💻 Getting Started (Local Development)

### 1. Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v20+ recommended)
- PostgreSQL database server
- Redis server (or Docker for running via compose)

### 2. Clone & Install Dependencies
```bash
# Clone repository
git clone <repository-url>
cd ecommerce_clothing_Next.js

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and populate it with your environment variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/luxewear?schema=public"

# Redis Configuration
REDIS_URL="redis://localhost:6379"

# NextAuth Configuration
NEXTAUTH_SECRET="your_super_secret_jwt_encryption_key"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary Configuration
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
```

### 4. Database Migration & Seeding
Run Prisma migrations to initialize your database schema and seed initial sample data (categories, premium products, admin accounts):

```bash
# Push schema to database
npx prisma db push

# Seed database with sample products and categories
npm run prisma:seed
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will automatically redirect to your default locale (e.g., `http://localhost:3000/en`).

---

## 🐳 Docker Deployment

LuxeWear comes fully pre-configured for containerized deployment using Docker Compose, spinning up the Next.js production web server and an isolated Redis caching layer simultaneously.

```bash
# Build and run multi-container environment
docker-compose -f Docker/docker-compose.yml up --build -d

# Check running container logs
docker-compose -f Docker/docker-compose.yml logs -f

# Shut down containers
docker-compose -f Docker/docker-compose.yml down
```

---

## 🛡️ License & Copyright

**LuxeWear** — Designed and built with uncompromising aesthetic standards and premium engineering practices. All rights reserved.
