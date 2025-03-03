import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // You would normally fetch tasks from the backend here
    setTasks([
      { id: 1, title: 'Learn React', completed: false },
      { id: 2, title: 'Build a Todo App', completed: false },
    ]);
  }, []);

  const addTask = () => {
    if (newTask) {
      const task = {
        id: tasks.length + 1,
        title: newTask,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="app-container">
      <h1 className="app-header">Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="add-button" onClick={addTask}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <div className="task-info">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task.id)}
              />
              <span className={task.completed ? 'completed' : ''}>
                {task.title}
              </span>
            </div>
            <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
