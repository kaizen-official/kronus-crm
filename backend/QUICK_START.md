# Kronus CRM - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

Follow these steps to get your Kronus CRM backend up and running.

## Prerequisites Check

✅ **Node.js** (v16+): Run `node --version`  
✅ **MongoDB**: Running locally or have Atlas connection string  
✅ **npm**: Run `npm --version`

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

The `.env` file is already created with default values. Update these if needed:

```bash
# Edit .env file
DATABASE_URL=mongodb://localhost:27017/kronus_crm
JWT_SECRET=kronus_super_secret_jwt_key_2024_change_in_production
```

For email functionality (forgot password), update:
```bash
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### 3. Setup Database

Generate Prisma Client:
```bash
npx prisma generate
```

Push schema to database:
```bash
npx prisma db push
```

### 4. Seed Database (Optional but Recommended)

This creates sample users and leads:
```bash
npm run seed
```

**Test Accounts Created:**
- **Super Admin**: admin@kronus.com / Admin@123456
- **Manager**: manager@kronus.com / Manager@123456
- **User**: user1@kronus.com / User@123456

### 5. Start the Server

```bash
npm run dev
```

Server will start at: `http://localhost:5000`

You should see:
```
╔═══════════════════════════════════════════╗
║                                           ║
║     🚀 Kronus CRM Backend Server         ║
║                                           ║
║     Environment: development             ║
║     Port: 5000                           ║
║     API Base: http://localhost:5000/api  ║
║                                           ║
╚═══════════════════════════════════════════╝
```

## ✅ Verify Installation

### 1. Health Check

```bash
curl http://localhost:5000/health
```

Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:00:00.000Z"
}
```

### 2. Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@kronus.com",
    "password": "Admin@123456"
  }'
```

Should return a token!

## 📚 Next Steps

1. **Read the API Documentation**: Check `API_DOCUMENTATION.md`
2. **Test APIs**: Use Postman or Thunder Client
3. **Explore Prisma Studio**: `npx prisma studio` (GUI for database)
4. **Connect Frontend**: Update frontend to use `http://localhost:5000/api`

## 🛠️ Common Commands

```bash
# Development with auto-reload
npm run dev

# Production start
npm start

# Generate Prisma Client (after schema changes)
npx prisma generate

# Push schema changes to database
npx prisma db push

# Seed database
npm run seed

# Open Prisma Studio (Database GUI)
npx prisma studio

# View database schema
npx prisma db pull
```

## 🔧 Troubleshooting

### MongoDB Connection Error

**Error**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**: Make sure MongoDB is running:
```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or check if running
ps aux | grep mongod
```

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**: Change PORT in `.env` file or kill the process:
```bash
# Find process on port 5000
lsof -ti:5000

# Kill process
kill -9 $(lsof -ti:5000)
```

### Prisma Client Not Generated

**Error**: `Cannot find module '@prisma/client'`

**Solution**: Generate Prisma Client:
```bash
npx prisma generate
```

### Module Not Found

**Error**: `Cannot find module 'helmet'` or similar

**Solution**: Reinstall dependencies:
```bash
npm install
```

## 📊 Database Management

### View Data in Prisma Studio

```bash
npx prisma studio
```

Opens a GUI at `http://localhost:5555` where you can:
- View all tables/collections
- Edit data directly
- Run queries

### Reset Database

```bash
# Warning: This will delete all data
npx prisma db push --force-reset

# Then seed again
npm run seed
```

## 🔐 Security Notes

### For Production Deployment

1. **Change JWT Secrets** in `.env`:
   ```bash
   JWT_SECRET=your_production_secret_key_here
   JWT_REFRESH_SECRET=your_production_refresh_secret_here
   ```

2. **Use Strong Passwords**: Change default passwords

3. **Enable HTTPS**: Use SSL certificates

4. **Update CORS**: Set proper frontend URL
   ```bash
   FRONTEND_URL=https://your-frontend-domain.com
   ```

5. **Configure Email**: Set up proper SMTP for password reset

6. **Use MongoDB Atlas**: For production database

## 📝 Testing the API

### Using cURL

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123456",
    "firstName": "Test",
    "lastName": "User",
    "phone": "+1234567890"
  }'
```

**Get All Leads:**
```bash
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import the API endpoints
2. Set base URL: `http://localhost:5000/api`
3. Add Authorization header: `Bearer {token}`
4. Test each endpoint

## 🌟 Features Available

✅ User Authentication (Register, Login, Password Reset)  
✅ User Management (CRUD, Roles, Permissions)  
✅ Lead Management (CRUD, Assignment, Tracking)  
✅ Role-Based Access Control  
✅ Activity Tracking  
✅ Statistics & Analytics  
✅ Email Notifications  
✅ Rate Limiting  
✅ Data Validation  
✅ Security Middleware  

## 📞 Need Help?

- Check `README.md` for detailed documentation
- See `API_DOCUMENTATION.md` for API reference
- Review error logs in terminal
- Check Prisma schema in `prisma/schema.prisma`

## 🎉 You're Ready!

Your Kronus CRM backend is now running. Start building amazing features! 🚀
