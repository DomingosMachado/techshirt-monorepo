# TechShirt

A full stack demo e-commerce store that sells t-shirts with QR codes linking to digital courses. It is a monorepo with a Spring Boot REST API and a React single page app.

TechShirt is a fictional brand and this repository contains no real data. It started as a team course project and was cleaned up for public use.

## Structure

| Folder | What it is | Stack |
| --- | --- | --- |
| `backend/` | REST API with JWT auth, optional TOTP 2FA, products, stock, orders, addresses, QR codes, transactional email | Java 17, Spring Boot 3, Spring Security, Spring Data JPA, PostgreSQL, Maven |
| `frontend/` | Storefront and admin panel | React 19, Vite, React Router, Axios, GSAP, Three.js |

## Quick start

You need JDK 17, Maven 3.8+, Node 18+, and a PostgreSQL database.

```bash
# 1. Backend (http://localhost:8080, Swagger UI at /swagger-ui.html)
cd backend
cp .env.example .env            # fill in your own values
set -a; source .env; set +a
cp src/main/resources/firebase.json.example src/main/resources/firebase.json   # then paste your own service account key
./mvnw spring-boot:run

# 2. Frontend (http://localhost:5173)
cd ../frontend
cp .env.example .env
npm install
npm run dev
```

The backend needs a Firebase Storage bucket and a service account key to store QR code images. Without them the app context will not start. See `backend/README.md` for details.

## Features

- Registration and login with JWT, role based access (`ROLE_USER`, `ROLE_ADMIN`), optional TOTP two factor authentication
- Products, categories, per size stock, product images
- Cart, checkout and order history, with order status updates and cancellation emails
- Address lookup by postal code through the public ViaCEP API
- QR code generation per product, stored in Firebase Storage
- Admin panel for products, orders, customers and QR codes
- Accessibility features: light and dark themes, keyboard navigation, font scaling

## License

MIT. See [LICENSE](LICENSE).
