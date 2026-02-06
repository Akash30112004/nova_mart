# NovaMart Backend - Phase 1 & 2 Complete ✅

## Overview

NovaMart backend is a production-ready REST API built with Node.js, Express, MongoDB, and JWT authentication.

### Phase 1 & 2 Completed
- ✅ Express server setup with middleware
- ✅ MongoDB connection with Mongoose
- ✅ Global error handling
- ✅ User authentication (signup, login, logout)
- ✅ JWT token generation and verification
- ✅ Input validation with express-validator
- ✅ Security features (helmet, CORS, rate limiting)

---

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── auth.controller.js # Auth logic
│   ├── models/
│   │   └── User.model.js      # User schema
│   ├── routes/
│   │   └── auth.routes.js     # Auth endpoints
│   ├── middlewares/
│   │   ├── auth.middleware.js       # JWT verification
│   │   ├── error.middleware.js      # Error handling
│   │   └── validate.middleware.js   # Input validation
│   ├── utils/
│   │   ├── asyncHandler.js    # Async wrapper
│   │   ├── generateToken.js   # JWT generation
│   │   └── logger.js          # Logging
│   ├── app.js                 # Express config
│   └── server.js              # Entry point
├── .env                       # Environment variables
├── .env.example               # Example env
├── .gitignore
└── package.json
```

---

## Installation & Setup

### 1. Prerequisites
- Node.js v16+ installed
- MongoDB running locally or remote URI
- npm or yarn

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment
Copy `.env.example` to `.env` and update values:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/novamart
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d
FRONTEND_URL=http://localhost:5173
```

### 4. Start Server

**Development (with nodemon auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will start on `http://localhost:5000`

---

## API Endpoints (Phase 1 & 2)

### Health Check
```
GET /api/health
Response: { success: true, message: "Server is running", timestamp: "..." }
```

### Authentication Endpoints

#### 1. Sign Up
```
POST /api/auth/signup
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": false
  }
}
```

#### 2. Login
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "securepass123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": false
  }
}
```

#### 3. Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": false
  }
}
```

#### 4. Logout
```
POST /api/auth/logout
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Error Handling

### Error Response Format
All errors return in this format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Common Status Codes
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid token/credentials)
- `404` - Not Found
- `500` - Server Error

---

## Key Features

### 1. Security
- ✅ **Password Hashing**: bcryptjs with salting (10 rounds)
- ✅ **JWT Authentication**: Token-based auth with expiry
- ✅ **Input Validation**: express-validator with custom rules
- ✅ **Helmet**: HTTP headers security
- ✅ **CORS**: Configured for frontend origin
- ✅ **Rate Limiting**: 100 requests per 15 minutes per IP

### 2. Error Handling
- ✅ Global error middleware catches all errors
- ✅ Async errors wrapped with asyncHandler
- ✅ Meaningful error messages
- ✅ Development-mode error details

### 3. Logging
- ✅ Color-coded console logs
- ✅ Morgan request logging
- ✅ Error tracking with context

### 4. Validation
- ✅ Email validation with regex
- ✅ Password strength check (min 6 chars)
- ✅ Name validation (2-50 chars)
- ✅ Duplicate email prevention

---

## Testing Auth Endpoints

### Using Postman or cURL

#### Test Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Test Protected Route (using token)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your_token_here>"
```

---

## Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  password: String (required, hashed, min 6 chars),
  isAdmin: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Development Commands

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Install dependencies
npm install

# List installed packages
npm list
```

---

## Next Phases (Coming Soon)

### Phase 3: Products
- Product CRUD endpoints
- Admin-only product management
- Product filters (category, price)
- Product model with details

### Phase 4: Cart & Orders
- Order creation from cart
- Order history
- Order status management
- Order total calculation

### Phase 5: Razorpay Payment
- Razorpay order creation
- Payment verification
- Payment status updates
- Webhook handling

---

## Best Practices Implemented

1. **MVC Architecture**: Clear separation of models, controllers, routes
2. **Error Handling**: Centralized error middleware for consistency
3. **Input Validation**: Server-side validation before processing
4. **Security**: Bcrypt hashing, JWT tokens, CORS, helmet
5. **Code Organization**: Modular structure with utils and middlewares
6. **Logging**: Colored console logs for debugging
7. **Environment Management**: dotenv for configuration
8. **Async/Await**: Modern async syntax with error handling

---

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- Verify MongoDB is accessible on port 27017

### Port Already in Use
- Change `PORT` in `.env`
- Or kill process using port 5000: `lsof -ti:5000 | xargs kill -9`

### JWT Token Error
- Ensure token is passed in Authorization header
- Format: `Authorization: Bearer <token>`
- Check token expiry in JWT_EXPIRY env

### CORS Error
- Verify `FRONTEND_URL` in `.env` matches frontend URL
- Check browser console for CORS details

---

## Support & Documentation

For more details on specific features:
- **Authentication**: See `src/controllers/auth.controller.js`
- **Validation**: See `src/middlewares/validate.middleware.js`
- **Error Handling**: See `src/middlewares/error.middleware.js`

---

**Status**: Phase 1 & 2 Complete ✅  
**Next**: Phase 3 - Products (When ready, follow same pattern)

---
