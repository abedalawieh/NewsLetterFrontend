# Newsletter Frontend (Public Website)

The frontend is a React + TypeScript app that allows visitors to subscribe to the newsletter and manage their preferences via a simple form UI.

## Live URL

- https://newsletter-63fh.onrender.com/

## What users can do

- Submit a newsletter subscription
- Select interests (e.g., Houses, Apartments, Rental)
- Choose preferred communication methods
- Receive success or error feedback after submit

## How to use (visitor)

1. Open the website.
2. Fill in your name, email, and preferences.
3. Choose communication methods and interests.
4. Submit the form to subscribe.

## Features

- Public subscription form
- Interest selection and communication preferences
- Client-side validation
- API integration with the backend
- Typed request/response models
- Reusable form components

## Email delivery note (Render free tier)

If the backend is hosted on Render free tier, outbound SMTP is blocked, so emails will not send from the server.

## Libraries used

- React 18
- React Router
- Axios
- Vite
- TypeScript
- ESLint

## Technical overview

- Build tool: Vite (fast dev server, optimized production builds)
- UI layer: React components with a small reusable component set
- Routing: React Router for client-side navigation
- API layer: Axios service module for backend calls
- Types: Shared TypeScript models for request/response payloads
- Validation: Client-side checks before submission

## Project structure

```
frontend/
  src/
    components/      Reusable UI components
    hooks/           Custom React hooks
    services/        API calls to the backend
    types/           TypeScript types
    utils/           Helpers
```

## Key folders (more detail)

- `src/components`: UI building blocks like inputs, buttons, and form controls.
- `src/hooks`: Form state and submission logic (custom hooks).
- `src/services`: API client functions for the backend.
- `src/types`: Shared TypeScript types for data and API payloads.
- `src/utils`: Small helpers used across the app.

## Environment configuration

The frontend uses a backend API base URL (Vite env). Create a `.env` file in `frontend/` if you want to override the default:

```
VITE_API_BASE_URL=https://newsletter-server-ryog.onrender.com/api
```

## How the frontend talks to the backend

- HTTP client: Axios
- Base URL: from `VITE_API_BASE_URL`
- The frontend calls the backend REST API to create subscribers and read lookup data (interests/communication methods).

## Common pages / flows

- Subscription form (main entry): collects user info and submits to the backend.
- Success/validation feedback: form shows inline errors or a success state after submission.

## Local dev (optional)

From `frontend`:

```bash
npm install
npm run dev
```

The app will start on the configured Vite port.

## Build for production

From `frontend`:

```bash
npm run build
```

The production assets will be generated in `frontend/dist`.

## Troubleshooting

- If the form fails to submit, verify `VITE_API_BASE_URL` is correct and the backend is reachable.
- If CORS errors appear in the browser console, confirm the backend CORS `AllowedOrigins` includes the frontend URL.
