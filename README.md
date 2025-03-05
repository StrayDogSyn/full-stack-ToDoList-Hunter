# StrayDog Todo List Application

A modern, responsive todo list application with a black and gold theme.

## Project Structure
```
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   ├── models/
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── logger.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── strayDog.png
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   │   ├── Header.js
│   │   │   │   └── Header.css
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.js
│   │   │   │   └── Footer.css
│   │   │   ├── TaskForm/
│   │   │   │   ├── TaskForm.js
│   │   │   │   └── TaskForm.css
│   │   │   └── TaskFilters/
│   │   │       ├── TaskFilters.js
│   │   │       └── TaskFilters.css
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   └── variables.css
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## Features
- Modern black and gold theme
- Responsive design
- User name persistence
- Task filtering and sorting
- Priority levels
- Categories
- Due dates

## Setup Instructions

### Backend
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file with your MongoDB connection string:
```
MONGODB_URI=your_mongodb_uri
PORT=5001
```

4. Start the server:
```bash
npm run dev
```

### Frontend
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file:
```
REACT_APP_API_URL=http://localhost:5001
```

4. Start the development server:
```bash
npm start
```

## Technologies Used
- Frontend:
  - React
  - Tailwind CSS
  - Axios
- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## License
© 2025 StrayDog Syndications LLC. All rights reserved.
