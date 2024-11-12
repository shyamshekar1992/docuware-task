import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../components/TodoItem';

test('calls onToggleComplete when the item text is clicked', () => {
    // Arrange
    const todo = { id: 1, name: 'Test Todo', isComplete: false };
    const onToggleComplete = jest.fn();

    // Act
    render(<TodoItem todo={todo} onToggleComplete={onToggleComplete} onDelete={() => { }} />);
    
    // Use getByText to find the ListItemText and simulate a click
    fireEvent.click(screen.getByText('Test Todo'));

    // Assert
    expect(onToggleComplete).toHaveBeenCalledWith(1);
    expect(onToggleComplete).toHaveBeenCalledTimes(1);
});

test('calls onDelete when the delete button is clicked', () => {
    // Arrange
    const todo = { id: 1, name: 'Test Todo', isComplete: false };
    const onDelete = jest.fn();

    // Act
    render(<TodoItem todo={todo} onToggleComplete={() => { }} onDelete={onDelete} />);
    
    // Use getByRole with a more specific query to find the IconButton
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    // Assert
    expect(onDelete).toHaveBeenCalledWith(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
});
