# Clínica Ungethuem

Vue.js application with AWS Cognito authentication for Gestão de Pré atendimento.

## Features

- Vue 3 with Composition API (similar to React hooks)
- AWS Cognito authentication
- TypeScript support
- Tailwind CSS for styling
- Vue Router for navigation
- Clean, modern UI matching the design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your AWS Cognito credentials:
```
VITE_USER_POOL_ID=your-user-pool-id
VITE_CLIENT_ID=your-client-id
```

3. Run the development server:
```bash
npm run dev
```

## Project Structure

```
src/
  composables/     # Reusable composables (like React hooks)
    useAuth.ts     # Authentication composable (similar to useState)
  views/           # Page components
    LoginView.vue
    DashboardView.vue
  router/          # Vue Router configuration
  App.vue          # Root component
  main.ts          # Entry point
```

## Authentication

The `useAuth` composable provides authentication state and methods, similar to React's `useState` pattern:

```typescript
const { isAuthenticated, user, login, logout } = useAuth()
```

## Backend

This project is designed to work with a Go backend. The frontend handles authentication via AWS Cognito, and API calls to the Go backend can be made using the authentication tokens.

