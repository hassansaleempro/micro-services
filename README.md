# Ride-Sharing Microservices Application

A Node.js microservices application for ride-sharing with separate services for users, captains (drivers), rides, and an API gateway.

## 🏗️ Architecture

- **Gateway Service** (Port 3000): API Gateway that routes requests to appropriate microservices
- **User Service** (Port 3001): Handles user registration, authentication, and profile management
- **Captain Service** (Port 3002): Manages driver registration, authentication, and availability
- **Ride Service** (Port 3003): Handles ride creation, acceptance, and status management

## 🛠️ Prerequisites

Before running this project, ensure you have the following installed:

1. **Node.js** (v14 or higher)
2. **MongoDB** (running locally or accessible)
3. **RabbitMQ** (running locally or accessible)

## 🚀 Quick Start

### 1. Install Dependencies

Navigate to each service directory and install dependencies:

```bash
# Install dependencies for all services
cd user && npm install
cd ../captain && npm install
cd ../ride && npm install
cd ../gateway && npm install
```

### 2. Environment Setup

1. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration:
   - Set your MongoDB connection string
   - Set your RabbitMQ connection string
   - Set a secure JWT secret

### 3. Start External Services

**Start MongoDB:**

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# Or run directly
mongod
```

**Start RabbitMQ:**

```bash
# On macOS with Homebrew
brew services start rabbitmq

# On Ubuntu/Debian
sudo systemctl start rabbitmq-server

# Or run directly
rabbitmq-server
```

### 4. Run the Services

Open 4 separate terminal windows and run each service:

**Terminal 1 - Gateway Service:**

```bash
cd gateway
node app.js
```

**Terminal 2 - User Service:**

```bash
cd user
node server.js
```

**Terminal 3 - Captain Service:**

```bash
cd captain
node server.js
```

**Terminal 4 - Ride Service:**

```bash
cd ride
node server.js
```

## 📡 API Endpoints

### Gateway (Port 3000)

All requests go through the gateway and are proxied to the appropriate service:

- `POST /user/register` - User registration
- `POST /user/login` - User login
- `GET /user/profile` - Get user profile (requires auth)
- `POST /captain/register` - Captain registration
- `POST /captain/login` - Captain login
- `GET /captain/profile` - Get captain profile (requires auth)
- `PATCH /captain/toggle-availability` - Toggle captain availability
- `POST /ride/create-ride` - Create a new ride (requires user auth)
- `PUT /ride/accept-ride` - Accept a ride (requires captain auth)

## 🔄 Workflow

1. **User Registration/Login**: Users register and get JWT tokens
2. **Captain Registration/Login**: Captains register and get JWT tokens
3. **Ride Creation**: Users create rides which are published to RabbitMQ
4. **Ride Acceptance**: Captains can accept available rides
5. **Real-time Updates**: Status updates are communicated via RabbitMQ

## 🗄️ Database

The application uses MongoDB with the following collections:

- `users` - User accounts and profiles
- `captains` - Captain/driver accounts and profiles
- `rides` - Ride requests and status
- `blacklisttokens` - Invalidated JWT tokens

## 📨 Message Queue

RabbitMQ is used for:

- `new-ride` queue: Notifies captains of new ride requests
- `ride-accepted` queue: Notifies users when their ride is accepted

## 🔐 Authentication

- JWT tokens are used for authentication
- Tokens are stored in HTTP-only cookies
- Password hashing using bcrypt
- Token blacklisting for logout functionality

## 🐛 Troubleshooting

1. **Port conflicts**: Ensure ports 3000-3003 are available
2. **MongoDB connection**: Verify MongoDB is running and accessible
3. **RabbitMQ connection**: Ensure RabbitMQ is running and accessible
4. **Environment variables**: Check that all required environment variables are set

## 📝 Development Notes

- Each service has its own database connection
- Services communicate via RabbitMQ for real-time features
- The gateway handles CORS and request routing
- Long polling is used for real-time ride status updates
