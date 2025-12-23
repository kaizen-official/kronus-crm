# Kronus CRM Backend

A secure and scalable CRM backend API built with Node.js, Express, Prisma, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**
  - User registration and login with JWT
  - Password reset with email
  - Role-based access control (Super Admin, Admin, Manager, User)
  - Secure password hashing with bcrypt

- **User Management**
  - CRUD operations for users
  - User profile management
  - User statistics and reporting

- **Lead Management**
  - Complete CRUD operations for leads
  - Lead assignment and tracking
  - Advanced filtering and search
  - Lead statistics and analytics
  - Activity tracking

- **Security Features**
  - Helmet.js for security headers
  - Rate limiting to prevent brute force attacks
  - MongoDB injection protection
  - XSS protection
  - CORS configuration
  - Input validation and sanitization
  - JWT token authentication

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Update the values in `.env` file:
     - `DATABASE_URL`: Your MongoDB connection string
     - `JWT_SECRET`: Your JWT secret key
     - `JWT_REFRESH_SECRET`: Your refresh token secret
     - Email configuration for password reset
     - Other configuration as needed

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Push database schema**
   ```bash
   npx prisma db push
   ```

6. **Start the development server**
   ```bash
   npm run test
   ```

The server will start at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── config/
│   │   ├── database.js        # Prisma client configuration
│   │   └── constants.js       # Application constants
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── userController.js  # User management logic
│   │   └── leadController.js  # Lead management logic
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication
│   │   ├── errorHandler.js    # Global error handling
│   │   ├── security.js        # Security middleware
│   │   └── validate.js        # Request validation
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication routes
│   │   ├── userRoutes.js      # User routes
│   │   └── leadRoutes.js      # Lead routes
│   ├── utils/
│   │   ├── tokenUtils.js      # JWT token utilities
│   │   ├── cryptoUtils.js     # Encryption utilities
│   │   ├── emailUtils.js      # Email utilities
│   │   └── validationRules.js # Validation schemas
│   └── index.js               # Application entry point
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore file
└── package.json               # Dependencies and scripts
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password
- `PUT /api/auth/change-password` - Change password (authenticated)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (Admin/Manager)
- `GET /api/users/stats` - Get user statistics (Admin/Manager)
- `GET /api/users/:id` - Get user by ID (Admin/Manager)
- `POST /api/users` - Create new user (Admin)
- `PUT /api/users/:id` - Update user (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

### Leads
- `GET /api/leads` - Get all leads (with pagination & filters)
- `GET /api/leads/stats` - Get lead statistics
- `GET /api/leads/:id` - Get lead by ID
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead (Admin)
- `PUT /api/leads/:id/assign` - Assign lead (Admin/Manager)

## 🔒 Security Best Practices Implemented

1. **Password Security**
   - Bcrypt hashing with 12 rounds
   - Strong password validation
   - Secure password reset flow

2. **Authentication**
   - JWT tokens with expiration
   - Refresh token support
   - Token verification on protected routes

3. **Rate Limiting**
   - General API rate limiting: 100 requests per 15 minutes
   - Auth endpoints: 5 requests per 15 minutes

4. **Data Protection**
   - MongoDB injection prevention
   - XSS attack prevention
   - Input validation and sanitization
   - CORS configuration

5. **HTTP Security**
   - Helmet.js security headers
   - HTTPS enforcement (production)
   - CSP headers

6. **Error Handling**
   - Global error handler
   - No sensitive data in error messages
   - Detailed logging in development only

## 🌐 Environment Variables

Required environment variables:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/kronus_crm
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRE=30d
RESET_PASSWORD_EXPIRE=3600000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@kronuscrm.com
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_ROUNDS=12
```

## 🧪 Testing

```bash
# Run development server with nodemon
npm run test
```

## 📊 Database Schema

The application uses MongoDB with Prisma ORM. Main models:
- **User**: System users with role-based access
- **Lead**: Customer leads with tracking
- **Activity**: Activity logs for leads

See [schema.prisma](prisma/schema.prisma) for complete schema definition.

## 🚀 Deployment

1. **Set environment to production**
   ```bash
   NODE_ENV=production
   ```

2. **Update environment variables**
   - Use production database URL
   - Set strong JWT secrets
   - Configure production email service
   - Set production FRONTEND_URL

3. **Build and start**
   ```bash
   npm install --production
   npx prisma generate
   npx prisma db push
   node src/index.js
   ```

## 🔄 API Response Format

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ /* validation errors if any */ ]
}
```

## 👥 User Roles

- **SUPER_ADMIN**: Full system access
- **ADMIN**: User and lead management
- **MANAGER**: Lead assignment and management
- **USER**: Basic lead operations

## 📝 License

ISC

## 👨‍💻 Author

Kaizen

---

For issues and feature requests, please contact the development team.
