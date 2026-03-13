# Backend

Uses Express and Socket.IO to establish websocket connections between phone and
laptop clients, and also between players in matchmaking.

## Setup Instructions

1. Ensure Node.js and OpenSSL are installed on your machine.

2. Select this directory:

   ```sh
   cd backend
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. Create self-signed HTTPS certificates:

   ```sh
   openssl req -new -x509 -nodes -out cert.pem -keyout key.pem -newkey ec \
     -pkeyopt ec_paramgen_curve:prime256v1 -days 14 -subj '/CN=<ip>'
   ```

   where `<ip>` is your local network IP address.

5. Create a `.env` file in this directory with the following content:

   ```sh
   FRONTEND_URL=https://<ip>:3000 # url of the frontend
   BACKEND_URL=https://<ip>:8000 # url of the model backend server
   ```

6. Run the server:

   ```sh
   npm run serve
   ```

   or, run with watch enabled:

   ```sh
   npm run dev
   ```
