# 🚀 Quick Start Guide - Local Development

## Running the Application Locally

This guide helps you run the StrayDog Todo List application for local development and demo purposes.

### ⚡ Quick Start (Demo Mode - No Database Required)

The application now runs in **demo mode** by default, using in-memory storage. Perfect for portfolios and demonstrations!

#### Step 1: Install Dependencies

```bash
# From the project root
npm run install:all

# Or install separately
cd frontend
npm install

cd ../backend
npm install
```

#### Step 2: Start the Backend (Port 5001)

Open a terminal in the project root:

```bash
# Option 1: From root
npm run start:backend

# Option 2: From backend folder
cd backend
npm start
```

You should see:
```
🚀 StrayDog Todo API Server - DEMO MODE
========================================
✅ Server running on http://localhost:5001
💚 Health check: http://localhost:5001/api/health
📝 Note: Using in-memory storage (data will not persist)
========================================
```

#### Step 3: Start the Frontend (Port 3000)

Open a **NEW terminal** in the project root:

```bash
# Option 1: From root
npm run start:frontend

# Option 2: From frontend folder
cd frontend
npm start
```

The browser should automatically open to `http://localhost:3000`

#### Step 4: Use the Application!

- Create tasks
- Mark tasks as complete
- Filter by priority
- Search tasks
- Organize by category

**Note**: Data is stored in-memory and will be lost when you restart the server. This is perfect for demos!

---

## 🔧 Troubleshooting

### Connection Error

If you see "Unable to connect to the server":

1. **Check Backend is Running**
   - Look for the terminal with backend running
   - Should see "Server running on http://localhost:5001"

2. **Check Port 5001 is Available**
   ```bash
   # Windows PowerShell
   netstat -ano | findstr ":5001"
   
   # If something is using port 5001, change the port in backend/.env
   ```

3. **Restart Both Servers**
   ```bash
   # Kill both terminals (Ctrl+C)
   # Start backend first, then frontend
   ```

### Port Already in Use

If port 3000 or 5001 is already in use:

**For Backend (Port 5001):**
1. Create `backend/.env` file
2. Add: `PORT=5002` (or any available port)
3. Update frontend `src/App.js` line 10:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
   ```

**For Frontend (Port 3000):**
- React will ask if you want to use a different port
- Type 'y' and press Enter

### Module Not Found Errors

```bash
# Reinstall dependencies
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 🗄️ Using MongoDB (Optional - For Production)

If you want to use MongoDB instead of in-memory storage:

### Step 1: Install MongoDB

- Download from: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### Step 2: Start MongoDB

```bash
# Windows
mongod --dbpath="C:\data\db"

# Mac/Linux
mongod --dbpath="/data/db"
```

### Step 3: Update Backend

```bash
cd backend

# Use the database-enabled server
npm run start:db

# Or for development with auto-reload
npm run dev:db
```

###  Step 4: Configure Connection

Create `backend/.env`:
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/straydog_todo
NODE_ENV=development
```

---

## 📝 Available Scripts

### Root Level

```bash
npm run install:all      # Install all dependencies
npm run start:frontend   # Start React frontend
npm run start:backend    # Start backend (demo mode)
npm run dev:backend      # Start backend with auto-reload
npm run build:frontend   # Build frontend for production
```

### Backend

```bash
npm start         # Start in demo mode (in-memory)
npm run dev       # Dev mode with auto-reload (in-memory)
npm run start:db  # Start with MongoDB
npm run dev:db    # Dev mode with MongoDB
npm test          # Run tests
npm run lint      # Check code style
```

### Frontend

```bash
npm start  # Start development server
npm test   # Run tests
npm run build  # Build for production
```

---

## 🌐 For Recruiters & Portfolio Viewers

**The application is designed to work instantly without any database setup!**

Just run:
```bash
# Terminal 1
cd backend
npm install
npm start

# Terminal 2
cd frontend
npm install
npm start
```

Then visit: http://localhost:3000

---

## ✅ Verification Checklist

- [ ] Backend terminal shows "Server running on http://localhost:5001"
- [ ] Frontend opens at http://localhost:3000
- [ ] No "Connection Error" message
- [ ] Can create a new task
- [ ] Can mark task as complete
- [ ] Can delete a task
- [ ] Can filter and search tasks

---

## 📞 Still Having Issues?

1. Check both terminals are running
2. Verify ports 3000 and 5001 are available
3. Try restarting both servers
4. Clear browser cache and refresh
5. Check the console for error messages

**For support**: Open an issue at https://github.com/StrayDogSyn/full-stack-ToDoList-Hunter/issues

---

**Last Updated**: October 26, 2025  
**Mode**: Demo Mode (In-Memory Storage)  
**Ports**: Frontend (3000), Backend (5001)
