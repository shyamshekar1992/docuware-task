import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoContext } from '../context/TodoContext'; // Import the context to mock it
import TodoForm from '../components/TodoForm';

test('calls addTodo from context when form is submitted', () => {
    // Arrange - mock the addTodo function
    const addTodo = jest.fn();
    render(
        <TodoContext.Provider value={{ addTodo }}>
            <TodoForm />
        </TodoContext.Provider>
    );

    // Act - simulate user typing and form submission
    fireEvent.change(screen.getByPlaceholderText('Add a new todo'), { target: { value: 'New Todo' } });
    fireEvent.click(screen.getByText('Add'));

    // Assert - check if addTodo was called with the correct value
    expect(addTodo).toHaveBeenCalledWith({ name: 'New Todo' });
    expect(addTodo).toHaveBeenCalledTimes(1); // Ensure it was called only once
});
    