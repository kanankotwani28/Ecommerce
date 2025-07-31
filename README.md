# Eclipse 🛒

**Eclipse** is a full-stack e-commerce platform built with a React + Vite frontend and an AI-generated RESTful backend. It supports full CRUD operations (Create, Read, Update, Delete) for products, orders, and users via Axios.

---

## 🚀 Features

- **Modern UI**: Built with React (functional components & Hooks), styled using HTML, CSS & JavaScript  
- **Fast Builds**: Powered by Vite for efficient bundling and hot module replacement  
- **AI-Generated Backend**: Auto-created REST API endpoints supporting POST, GET, PUT, DELETE for core entities  
- **Axios Integration**:
  - Centralized Axios instance using an environment-configurable `baseURL`
  - CRUD operations abstracted into clean service modules (e.g. `productService.js`)
  - Axios interceptors for auth headers and unified error handling
- **State Management**: Managed via `useState`, `useEffect`, with graceful handling of loading, success & error states

---

## 📦 Tech Stack

| Layer     | Technology                      |
|-----------|-------------------------------|
| Frontend  | React, Vite, HTML, CSS, JS     |
| HTTP Client | Axios                         |
| Backend   | AI-generated RESTful API       |
| State     | React Hooks (useState/useEffect) |

---

## 🔧 Setup & Installation

```bash
git clone https://github.com/kanankotwani28/Ecommerce.git
cd ecommerce-project
cd ecommerce-backend
npm install
npm run dev
