# StrayDog Todo List Application

A modern, responsive todo list application with a black and gold theme.

## Project Structure

```text
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
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   │   ├── Header.js
│   │   │   │   └── Header.css
│   │   │   ├── Footer.js
│   │   │   ├── TaskForm.js
│   │   │   └── TaskFilters.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## Features

- Modern black and gold theme
- Responsive design for all devices
- User name persistence with local storage
- Advanced task filtering and sorting
- Priority levels (Low, Medium, High)
- Task categories
- Due dates with reminders
- Real-time updates
- Error handling and loading states
- Smooth animations and transitions

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

1. Install dependencies:

```bash
npm install
```

1. Create a `.env` file in the backend directory with the following content:

```env
MONGODB_URI=mongodb://localhost:27017/todolist
PORT=5001
```

1. Start the development server:

```bash
npm run dev
```

The backend server will start on [http://localhost:5001](http://localhost:5001)

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

1. Install dependencies:

```bash
npm install
```

1. Create a `.env` file in the frontend directory with the following content:

```env
REACT_APP_API_URL=http://localhost:5001
```

1. Start the development server:

```bash
npm start
```

The frontend application will start on [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/search` - Search tasks with filters
- `GET /api/health` - Health check endpoint

## Technologies Used

### Frontend

- React 18
- Tailwind CSS
- Axios for API calls
- React Router for navigation
- Local Storage for user preferences

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests
- Morgan for request logging

## Development

- The application uses ESLint for code linting
- Prettier for code formatting
- Git hooks for pre-commit checks
- Continuous Integration with GitHub Actions

## Contributing

1. Fork the repository
1. Create your feature branch (`git checkout -b feature/AmazingFeature`)
1. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
1. Push to the branch (`git push origin feature/AmazingFeature`)
1. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

© 2025 StrayDog Syndications LLC. All rights reserved.
