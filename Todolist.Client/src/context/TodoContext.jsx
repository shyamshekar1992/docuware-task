import  { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import PropTypes from 'prop-types'; // Import PropTypes for validation

export const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    const fetchTodos = async (currentFilter = filter) => {
        setLoading(true); // Start loading
        try {
            const data = currentFilter === null 
                ? await api.getTodos() 
                : await api.getFilteredTodos(currentFilter);
            setTodos(data);
        } catch (error) {
            console.error('Failed to fetch todos', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [filter]);

    const addTodo = async (todo) => {
        setLoading(true);
        try {
            await api.addTodo(todo);
            fetchTodos(); // Refresh todos after adding
        } catch (error) {
            console.error('Failed to add todo', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteTodo = async (id) => {
        setLoading(true);
        try {
            await api.deleteTodo(id);
            fetchTodos(); // Refresh todos after deleting
        } catch (error) {
            console.error('Failed to delete todo', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleTodoStatus = async (id) => {
        setLoading(true);
        try {
            const todo = todos.find((todo) => todo.id === id);
            if (todo) {
                await api.toggleTodoStatus(id, !todo.isComplete);
                fetchTodos(); // Refresh todos after toggling
            }
        } catch (error) {
            console.error('Failed to toggle todo status', error);
        } finally {
            setLoading(false);
        }
    };
   
    
    return (
        <TodoContext.Provider value={{ todos, addTodo, deleteTodo, toggleTodoStatus, setFilter, loading }}>
            {children}
        </TodoContext.Provider>
    );
   
};
TodoProvider.propTypes = {
    children: PropTypes.node.isRequired, // children is a required prop and can be any renderable content
};


export default TodoProvider;
