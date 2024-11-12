
const API_URL = '/api/todo';

// Fetch all todos
const getTodos = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
};

// Add a new todo
const addTodo = async (todo) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error('Failed to add todo');
    return response.json();
};

// Delete a todo
const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
};

// Toggle todo status by fetching the full item, updating it, and sending it back
const toggleTodoStatus = async (id, isComplete) => {
    try {
        const response = await fetch(`${API_URL}/${id}/toggle`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(isComplete),
        });

        if (!response.ok) {
            throw new Error('Failed to toggle todo status');
        }

        // Only parse response JSON if response has content
        if (response.status !== 204) { // 204 No Content means no response body
            return await response.json();
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};


// Get filtered todos
const getFilteredTodos = async (isComplete) => {
    let query = '';
    if (typeof isComplete === 'boolean') {
        query = `?isComplete=${isComplete}`;
    }
    const response = await fetch(`${API_URL}/filter${query}`);
    if (!response.ok) throw new Error('Failed to fetch filtered todos');
    return response.json();
};

export default {
    getTodos,
    addTodo,
    deleteTodo,
    toggleTodoStatus,
    getFilteredTodos,
};

