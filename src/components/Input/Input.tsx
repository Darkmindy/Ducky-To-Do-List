import React, { useState } from "react";
import "./Input.css";
import { Todo } from "../../types/Todo";

const Input = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleClick = () => {
        if (editIndex !== null) {
            // Salva le modifiche durante l'editing
            handleSaveEdit();
        } else {
            // Aggiunge una nuova task
            setTodos((oldTodos) => [
                ...oldTodos,
                { id: Date.now(), title: inputValue, completed: false }
            ]);
            setInputValue('');
        }
    };

    const handleComplete = (index: number) => {
        setTodos((oldTodos) => {
            return oldTodos.map((todo, i) => {
                if (i === index) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
        });
    };

    const handleDelete = (index: number) => {
        setTodos((oldTodos) => oldTodos.filter((_, i) => i !== index));
        setEditIndex(null);
    };

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setInputValue(todos[index].title);
    };

    const handleSaveEdit = () => {
        if (editIndex !== null) {
            setTodos((oldTodos) => {
                const newTodos = [...oldTodos];
                newTodos[editIndex] = { ...oldTodos[editIndex], title: inputValue };
                return newTodos;
            });
            setEditIndex(null);
            setInputValue('');
        }
    };

    return (
         <div className="container">
                <div className="row">
                    <label>To Do List</label>
                    <div className="d-flex" style={{ marginBottom: '15px' }}>
                        <input //elemento di imput
                            type="text"
                            className="form-control"
                            placeholder="todo"
                            value={inputValue}
                            onChange={handleChange}
                        />
                        <button //tag bAtton (non si traduce!)
                         className="btn btn-light" onClick={handleClick}>
                            {editIndex !== null ? '💾' : '➕'}
                        </button>
                    </div>
                </div>

                <ul className="todo-list">
                    {todos.map((todo, index) => (
                        <div key={index} style={{ marginBottom: '8px', padding: '8px', background: editIndex === index ? '#ffeeba' : 'transparent' }} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            <li style={{ listStyle: 'none', fontSize: '20px' }}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleComplete(index)}
                                />
                                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                    {todo.title}
                                </span>
                                <button className="btn btn-danger" onClick={() => handleDelete(index)}>🗑️</button>
                                <button className="btn btn-dark" onClick={() => handleEdit(index)}>✏️</button>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
    );
};

export default Input;