# Anichat - Messaging Made Simple.

> Built with React, Redux, and Node.js.

Anichat is an app, similar to Discord, but cooler.

**Please star this repo to support development.**

<a href="https://ibb.co/kgndDwd"><img src="https://i.ibb.co/N6h4NJ4/Screenshot-from-2021-08-31-16-09-41.png" alt="Screenshot-from-2021-08-31-16-09-41" border="0" /></a>
<a href="https://ibb.co/st2q2B0"><img src="https://i.ibb.co/fQ2H2ch/Screenshot-from-2021-08-30-11-55-01.png" alt="Screenshot-from-2021-08-30-11-55-01" border="0" /></a>
<a href="https://ibb.co/SydPgTY"><img src="https://i.ibb.co/qjWd8Gq/Screenshot-from-2021-08-30-13-30-43.png" alt="Screenshot-from-2021-08-30-13-30-43" border="0" /></a>

> Want more stable commits? [Use the stable branch](/tree/v2-stable).

---

## Setup

1. Clone the repo (frop GitHub).
2. Generate SSH keys (secure user logins).
   From app directory (with Git bash):
   ```
   mkdir -p backend/keys
   ssh-keygen -t rsa -b 2048 -m PEM -f backend/keys/jwt
   ```
3. Install npm packages.
   From app directory:
   ```
   cd frontend
   npm i
   cd ../backend
   npm i
   ```
4. In `backend` directory, configure `.env.example` and rename the file to `.env`

---

## Features

- **Server Channels**
  - Create channels
  - Delete channels
- **Message Management**
  - Server owners can delete any message
  - Message author can delete and edit their own messages
- **Member Management**
  - Kick members as the server owner
  - Easily leave the server by right clicking the server
  - Join servers with an invite code
- **Server Management**
  - Create servers as you would in Discord
  - Edit server name, and icon URL in the server settings
  - Delete your server in the server settings
- **User Management**
  - Manage your account by clicking the settings icon
  - Change your username, and avatar
  - Delete your user and prevent it from being used to login
- **and more** (of course)

> Want a more basic version, that's more like Discord?
> https://github.com/codea-live/dclone

---

`backend/.env`
(dev with Docker)

```
EMAIL_ADDRESS="...@gmail.com"
EMAIL_PASSWORD="..."
MONGO_URI="mongodb://database/anichat"
NODE_ENV="dev"
PORT=3000
WEBSITE_URL="http://localhost:4200"
```

`backend/test/.env`
(test without Docker)

```
API_URL="http://localhost:3001/api"
EMAIL_ADDRESS="...@gmail.com"
EMAIL_PASSWORD="..."
MONGO_URI="mongodb://localhost/anichat-test"
NODE_ENV="dev"
PORT=3001
ROOT_ENDPOINT="http://localhost:3001"
WEBSITE_URL="http://localhost:4200"
```