import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill, BsSun, BsMoon } from "react-icons/bs";

function Home() {
    const [todos, setTodos] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/' + id)
            .then(() => location.reload())
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(() => location.reload())
            .catch(err => console.log(err));
    };

    const toggleTheme = () => setDarkMode(!darkMode);

    return (
        <div className={darkMode ? 'home dark' : 'home light'}>
            {/* Floating Theme Button at Top-Right */}
            <button className="theme-btn-top" onClick={toggleTheme}>
                {darkMode ? <BsSun /> : <BsMoon />}
            </button>

            <div className="header">
                <h1>🌈 My Todo List</h1>
            </div>

            <Create />

            {todos.length === 0 ? (
                <div className="no-record"><h2>No Tasks Found</h2></div>
            ) : (
                <div className="tasks-grid">
                    {todos.map(todo => (
                        <div className={`task-card ${todo.done ? 'done' : 'pending'}`} key={todo._id}>
                            <div className="task-left" onClick={() => handleEdit(todo._id)}>
                                {todo.done ?
                                    <BsFillCheckCircleFill className="icon done-icon" /> :
                                    <BsCircleFill className="icon pending-icon" />}
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div className="task-right">
                                <span className={`badge ${todo.done ? 'badge-done' : 'badge-pending'}`}>
                                    {todo.done ? 'Completed' : 'Pending'}
                                </span>
                                <BsFillTrashFill className="icon delete-icon" onClick={() => handleDelete(todo._id)} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Home;
