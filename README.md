# ✨ StrayDog Todo List Application

A sophisticated, full-stack todo list application featuring a stunning black and gold theme, modern animations, and a responsive design. Built with React, Node.js, and MongoDB, this application demonstrates professional-grade UI/UX with smooth transitions and interactive elements.

![StrayDog Todo List Banner](./frontend/src/assets/app-preview.png)

## 🌟 Key Features

- **Elegant UI Design**
  - Modern black and gold theme with gradient effects
  - Smooth animations and transitions
  - Responsive layout for all devices
  - Interactive hover effects and feedback

- **Task Management**
  - Create, read, update, and delete tasks
  - Priority levels with visual indicators
  - Category organization
  - Due date scheduling
  - Task completion tracking

- **Advanced Filtering & Sorting**
  - Real-time search functionality
  - Filter by category and priority
  - Multiple sorting options
  - Dynamic filter updates

- **User Experience**
  - Persistent user preferences
  - Intuitive interface
  - Loading states and animations
  - Error handling with visual feedback

## 🚀 Live Demo

[View Live Demo](https://straydogtodo.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/straydogtodo/deploys)

## 📁 Project Structure

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

## 🛠️ Technologies Used

### Frontend

- **React** - UI library
- **Tailwind CSS** - Styling and animations
- **Axios** - API requests
- **React Icons** - Icon library

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/StrayDogSyn/full-stack-ToDoList-Hunter.git
cd full-stack-ToDoList-Hunter
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Create a .env file:

```env
MONGODB_URI=your_mongodb_uri
PORT=5001
```

4. Start the server:

```bash
npm run dev
```

### Frontend Setup

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

2. Create a .env file:

```env
REACT_APP_API_URL=http://localhost:5001
```

3. Start the development server:

```bash
npm start
```

## 📱 Screenshots

### Application Overview

![Application Overview](./frontend/src/assets/screenshots/Screenshot%20(38).png)

### Task Management Interface

![Task Management](./frontend/src/assets/screenshots/Screenshot%20(39).png)

### Task Creation Form

![Task Creation](./frontend/src/assets/screenshots/Screenshot%20(40).png)

### Task Filtering and Sorting

![Task Filtering](./frontend/src/assets/screenshots/Screenshot%20(41).png)

## 🔄 API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/tasks/filter` - Get filtered tasks

## 🎯 Future Enhancements

- [ ] User authentication and profiles
- [ ] Task sharing and collaboration
- [ ] Dark/Light theme toggle
- [ ] Task analytics and insights
- [ ] Mobile app version

## 🔧 Recent Updates

- ✅ Improved project structure with separate frontend and backend directories
- ✅ Enhanced error handling and logging
- ✅ Added Netlify deployment configuration
- ✅ Implemented responsive design
- ✅ Added comprehensive documentation
- ✅ Fixed markdown linting issues
- ✅ Updated contact information

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

Copyright © 2024 StrayDog. All rights reserved.

## 🙏 Acknowledgments

- Design inspiration from modern UI/UX trends
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Animation ideas from [Tailwind CSS](https://tailwindcss.com/)

## 📞 Contact

- LinkedIn: [Eric Petross](https://www.linkedin.com/in/eric-petross)
- GitHub: [StrayDogSyn](https://github.com/StrayDogSyn)
- Email: eric.petross@gmail.com
