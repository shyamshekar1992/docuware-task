import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../components/Filter';
import TodoList from '../components/TodoList';
import { TodoContext } from '../context/TodoContext';

test('filters todos by status', () => {
    // Arrange - mock todos data directly as a prop
    const mockTodos = [
        { id: 1, name: 'Test Todo 1', isComplete: false },
        { id: 2, name: 'Test Todo 2', isComplete: true },
    ];

    // Wrapper component to simulate filtering behavior
    const Wrapper = () => {
        const [filteredTodos, setFilteredTodos] = useState(mockTodos);
        
        const markComplete = jest.fn(); // Mock markComplete function

        const handleFilterChange = (filterValue) => {
            if (filterValue === null) {
                setFilteredTodos(mockTodos); // Show all todos
            } else {
                setFilteredTodos(mockTodos.filter(todo => todo.isComplete === filterValue));
            }
        };

        return (
            <TodoContext.Provider value={{ markComplete }}>
                <Filter onFilterChange={handleFilterChange} />
                <TodoList todos={filteredTodos} />
            </TodoContext.Provider>
        );
    };

    // Render the Wrapper component instead of individual components
    render(<Wrapper />);

    // Act - simulate filtering to show only completed todos
    fireEvent.change(screen.getByLabelText('Filter'), { target: { value: 'true' } });
    expect(screen.queryByText('Test Todo 1')).toBeNull();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();

    // Act - simulate filtering to show only incomplete todos
    fireEvent.change(screen.getByLabelText('Filter'), { target: { value: 'false' } });
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Todo 2')).toBeNull();

    // Act - simulate showing all todos
    fireEvent.change(screen.getByLabelText('Filter'), { target: { value: '' } });
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
});
