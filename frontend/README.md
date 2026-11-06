# TechShirt Frontend

React storefront and admin panel for the TechShirt demo store. It talks to the [backend API](../backend) over REST.

## Features

- Login with JWT and optional two factor authentication
- Registration, profile editing, address management
- Product catalog with filtering, sorting and search
- Cart, checkout and order history
- Admin area for products, orders, customers and QR codes
- Light and dark themes, keyboard navigation, font scaling, responsive layout

## Stack

React 19, Vite, React Router, Axios, Context API, CSS Modules, GSAP, Three.js (react-three-fiber), ESLint with jsx-a11y.

## Run locally

Requirements: Node 18+ and the backend running.

```bash
cp .env.example .env     # set VITE_API_URL if the API is not on http://localhost:8080
npm install
npm run dev              # http://localhost:5173
```

Other scripts: `npm run build`, `npm run lint`, `npm run preview`.

## Layout

- `src/pages/` route level pages
- `src/components/` reusable components
- `src/contexts/` global state
- `src/hooks/` custom hooks
- `src/services/` API client (`api.js`)

## License

MIT. See the [LICENSE](../LICENSE) in the repository root.
