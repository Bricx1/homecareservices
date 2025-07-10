# Home Care Services Backend

This project now uses **Firebase Firestore** instead of a MySQL database. Ensure you provide a Firebase service account via environment variables as shown in `.env.example`.

## Environment Setup
Copy `.env.example` to `.env` and fill in your Firebase credentials and any external API keys (Axxess, Availity, ExtendedCare).

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@example.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR-PRIVATE-KEY\n-----END PRIVATE KEY-----\n"
AXXESS_BASE_URL=https://api.axxess.com
AXXESS_API_KEY=your-axxess-api-key
AVAILITY_BASE_URL=https://api.availity.com
AVAILITY_API_KEY=your-availity-api-key
EXTENDEDCARE_BASE_URL=https://api.extendedcare.com
EXTENDEDCARE_API_KEY=your-extendedcare-api-key
```

## Development
Install dependencies with `pnpm install` and run the development server:

```
pnpm install
pnpm dev
```

Note: Without installing dependencies, `npm run lint`, `npm run build`, and `npx tsc --noEmit` will fail.

## Integration API

The backend exposes endpoints under `/api/integrations` for managing third-party integrations. These routes store their settings in **Firebase Firestore**:

- `GET /api/integrations` – list all integrations
- `GET /api/integrations/[id]` – fetch a single integration record
- `POST /api/integrations/[id]` – enable or disable an integration
- `GET /api/integrations/[id]/config` – retrieve saved configuration
- `POST /api/integrations/[id]/config` – save configuration (expects `{ config: {...} }`)

Individual integrations also provide `/configure` and `/test-connection` endpoints for saving credentials and verifying connectivity.
