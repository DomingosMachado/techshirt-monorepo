# TechShirt API

REST API for the TechShirt demo store. Built with Java 17 and Spring Boot 3.

## Features

- JWT authentication and role based access control (`ROLE_USER`, `ROLE_ADMIN`)
- Optional two factor authentication with TOTP apps such as Google Authenticator
- Users, addresses (autofilled from ViaCEP), contacts, categories, products, product images, per size stock, payment methods
- Orders with status updates and cancellation
- QR code generation per product, images stored in Firebase Storage
- Transactional emails through Spring Mail
- Interactive API docs with Springdoc OpenAPI (Swagger UI)

## Stack

Java 17, Spring Boot 3, Spring Security 6, Spring Data JPA (Hibernate), PostgreSQL, H2, java-jwt, TOTP (`dev.samstevens.totp`), ZXing, Firebase Admin SDK, Springdoc, Lombok, Maven.

## Setup

Requirements: JDK 17, a PostgreSQL database, a Firebase project with a Storage bucket, an SMTP account.

1. Create your env file and load it:

   ```bash
   cp .env.example .env
   # edit .env with your own values
   set -a; source .env; set +a
   ```

2. Add your Firebase service account key. Copy `src/main/resources/firebase.json.example` to `src/main/resources/firebase.json` and replace its contents with your own key. The file is git-ignored.

3. Run:

   ```bash
   ./mvnw spring-boot:run
   ```

The `dev` profile is active by default and serves on `http://localhost:8080`. Set `SPRING_PROFILES_ACTIVE=prod` to use the `prod` profile (port 8002).

Swagger UI: `http://localhost:8080/swagger-ui.html`

## Configuration

| Variable | Purpose |
| --- | --- |
| `db_url_dev`, `db_username_dev`, `db_password_dev` | Dev database |
| `db_url_prod`, `db_username_prod`, `db_password_prod` | Prod database |
| `security_token_secret` | Secret used to sign JWTs |
| `swagger_dev_url`, `swagger_prod_url` | Server URLs shown in Swagger (default `http://localhost:8080`) |
| `cors_allowed_origins` | Comma separated allowed origins (default `http://localhost:5173`) |
| `mail_username`, `mail_password` | SMTP credentials |
| `firebase_storage_bucket` | Firebase Storage bucket name |

## Auth flow

1. `POST /auth/login` with credentials. Without 2FA, the API returns a JWT. Send it as `Authorization: Bearer <token>`.
2. To enable 2FA, a logged in user calls `POST /2fa/setup` (gets a secret and QR code), scans it, then confirms with a code at `POST /2fa/confirm`.
3. With 2FA on, login returns a short lived temporary token and `twoFactorRequired: true`. The client then calls `POST /auth/verify-2fa` with that token and the 6 digit code to get the final JWT.

## Tests

```bash
./mvnw test
```

The only test today is a Spring context load, which needs a reachable database and the Firebase key. Adding unit tests for the use case classes is a good first contribution.

## License

MIT. See the [LICENSE](../LICENSE) in the repository root.
