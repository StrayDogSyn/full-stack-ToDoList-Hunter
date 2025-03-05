# Full Stack Todo List Application

A modern full-stack todo list application built with React and Node.js.

## Project Structure

```
full-stack-todolist/
├── backend/                 # Backend Node.js/Express application
│   ├── src/                # Source code
│   │   └── server.js       # Main server file
│   ├── models/             # MongoDB models
│   └── package.json        # Backend dependencies
├── frontend/               # Frontend React application
│   ├── src/               # Source code
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
└── package.json           # Root package.json for managing both applications
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or a remote instance)
- npm or yarn

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd full-stack-todolist
   ```

2. Install dependencies for all parts:
   ```bash
   npm run install:all
   ```

3. Start the development servers:
   ```bash
   npm start
   ```

This will start both the backend and frontend servers concurrently:
- Backend will run on http://localhost:5000
- Frontend will run on http://localhost:3000

## Development

- Backend API endpoints:
  - GET /tasks - Get all tasks
  - POST /tasks - Create a new task
  - PUT /tasks/:id - Update a task
  - DELETE /tasks/:id - Delete a task

- Frontend development:
  - The React application is set up with Create React App
  - Hot reloading is enabled for both frontend and backend

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
