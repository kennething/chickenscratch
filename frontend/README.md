# Frontend

Uses Nuxt 4 to create a web UI for the game.

## Setup Instructions

1. Ensure Node.js is installed on your machine.

2. Select this directory:

```sh
cd frontend
```

3. Install dependencies:

```sh
npm install
```

4. Create a `.env` file in this directory with the following content:

```sh
NUXT_PUBLIC_BACKEND_URL=https://<ip>:8008 # dont append /
```

where `<ip>` is your local network IP address.

5. Run the development server on your network:

```sh
npm run dev -- --https --host=<ip>
```
