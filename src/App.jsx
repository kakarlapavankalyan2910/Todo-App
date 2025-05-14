import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (input.trim()) {
      const newTasks = [...tasks, { text: input, completed: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">React To-Do List 📝</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddTask}>Add</button>
      </div>

      <ul className="list-group">
        {tasks.length === 0 ? (
          <li className="list-group-item text-muted">No tasks yet</li>
        ) : (
          tasks.map((task, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              <span onClick={() => toggleTask(index)} style={{ cursor: 'pointer' }}>
                {task.text}
              </span>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTask(index)}
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;

