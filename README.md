# Full-Stack ToDo List - Hunter

Welcome to my first full-stack application, a To Do List designed to help manage my ADHD and busy schedule as a freelancer. This project serves as an independent study as I expand my skills as a full-stack developer. As of 2/01/2025, this project has become a personal endeavor in mastering both the MERN (MongoDB, Express, React, Node.js) stack and Python. I plan to continuously update this repository with MERN projects as I complete them, as well as Python-based practice projects.

## Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Acknowledgements](#acknowledgements)

## About the Project

This project is my first foray into full-stack web development, with the goal of building a fully functional To Do List application. It was created to help me manage tasks, stay organized, and maintain focus while juggling multiple projects. The app was built with an emphasis on both front-end and back-end functionality, demonstrating my skills in using the MERN stack and also laying the groundwork for future Python projects.

## Tech Stack

- **Frontend:** React.js, HTML5, CSS3, Bootstrap 5, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Version Control:** Git, GitHub
- **Utilities & Tools:** 
  - [DevDocs](https://devdocs.io/) for technical documentation
  - [MDN Web Docs](https://developer.mozilla.org/) for reference and best practices
  - GitHub Copilot (used for debugging assistance only)

## Project Structure

The structure of the project is organized as follows:

```
/full-stack-ToDoList-Hunter
│
├── /client                        # React front-end code
│   ├── /public                    # Static files like images, favicon
│   ├── /src                       # React components and state management
│   ├── /components                # Reusable UI components (buttons, forms, etc.)
│   ├── /context                   # React Context API for managing state
│   ├── /App.js                    # Main app component
│   └── /index.js                  # Entry point for React app
│
├── /server                        # Express server and backend code
│   ├── /models                    # MongoDB models (task schema, user schema)
│   ├── /routes                    # API routes for task operations
│   ├── /controllers               # Controllers for managing API logic
│   ├── /middleware                # Middleware functions for authentication, validation
│   └── /server.js                 # Entry point for the backend server
│
├── /config                        # Configuration files (e.g., environment variables)
├── /public                        # Public assets (favicon, etc.)
├── .env                           # Environment variables (MongoDB URI, server port, etc.)
├── package.json                   # Project dependencies and scripts
└── README.md                      # Project documentation
```

## Features

- **Add, Edit, and Delete Tasks**: Users can manage their tasks by adding new tasks, editing existing tasks, or deleting tasks that are no longer needed.
- **Mark Tasks as Completed**: Users can mark tasks as completed, which visually distinguishes them from pending tasks.
- **Responsive Design**: The application adapts to mobile, tablet, and desktop screen sizes.
- **Persistent Data Storage**: All tasks are stored in MongoDB, allowing them to persist even after the page is refreshed.
- **User Authentication (Future)**: Plans to implement login and user authentication for personalized task management.

## Setup and Installation

To run this project locally, follow the steps below.

### 1. Clone the repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/full-stack-ToDoList-Hunter.git
```

### 2. Install dependencies

Navigate to the project directory and install the dependencies for both the backend and frontend:

```bash
# In the root directory (for server)
npm install

# In the client directory (for React front-end)
cd client
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
MONGODB_URI=your_mongo_database_uri
PORT=your_preferred_port
```

Make sure to replace `your_mongo_database_uri` with the actual URI for your MongoDB database.

### 4. Start the application

Run the back-end server:

```bash
# In the root directory (for server)
npm start
```

In a separate terminal window, navigate to the `client` folder and run the React app:

```bash
# In the client directory
cd client
npm start
```

The application should now be available in your browser at `http://localhost:3000` (or your chosen port).

## Usage

- Open the app in your browser.
- Use the To-Do List to add tasks, mark them as completed, and remove them when they're no longer needed.
- The app saves your tasks persistently in MongoDB, so your data is retained between sessions.

## Future Improvements

- **Authentication & Authorization**: Implement user login and registration to enable personalized task management.
- **Task Prioritization**: Add the ability to assign priorities to tasks and visually differentiate them.
- **Due Dates & Reminders**: Allow users to set due dates for tasks and receive reminders or notifications.
- **Python Integration**: Plan to integrate Python-based APIs for enhanced backend functionality, such as automated task suggestions or advanced data processing.

## Acknowledgements

- **GitHub Copilot**: For assisting in debugging and providing code suggestions. All code is written by me, with Copilot serving as a debugging tool.
- **DevDocs and MDN Web Docs**: For providing comprehensive documentation that helped guide the development process.
