using System.Collections.Generic;
using System.Linq;
using Xunit;
using TodoList.Server.Models;
using TodoList.Server.Services;

namespace TodoList.Server.Tests
{
    public class TodoServiceFilterTests
    {
        private readonly TodoService _service;

        public TodoServiceFilterTests()
        {
            _service = new TodoService();
        }

        [Fact]
        public void GetFilteredTodos_ReturnsOnlyCompletedItems()
        {
            // Arrange
            _service.Add(new TodoItem { Name = "Todo 1", IsComplete = true });
            _service.Add(new TodoItem { Name = "Todo 2", IsComplete = true });
            _service.Add(new TodoItem { Name = "Todo 3", IsComplete = false });

            // Act
            var result = _service.GetFiltered(true).ToList(); // Retrieve only completed items

            // Assert
            Assert.Equal(2, result.Count); // Should return two completed items
            Assert.All(result, todo => Assert.True(todo.IsComplete)); // All items should be completed
        }

        [Fact]
        public void GetFilteredTodos_ReturnsOnlyIncompleteItems()
        {
            // Arrange
            _service.Add(new TodoItem { Name = "Todo 1", IsComplete = true });
            _service.Add(new TodoItem { Name = "Todo 2", IsComplete = false });
            _service.Add(new TodoItem { Name = "Todo 3", IsComplete = false });

            // Act
            var result = _service.GetFiltered(false).ToList(); // Retrieve only incomplete items

            // Assert
            Assert.Equal(2, result.Count); // Should return two incomplete items
            Assert.All(result, todo => Assert.False(todo.IsComplete)); // All items should be incomplete
        }

        [Fact]
        public void GetFilteredTodos_ReturnsAllItemsWhenNoFilter()
        {
            // Arrange
            _service.Add(new TodoItem { Name = "Todo 1", IsComplete = true });
            _service.Add(new TodoItem { Name = "Todo 2", IsComplete = false });
            _service.Add(new TodoItem { Name = "Todo 3", IsComplete = true });

            // Act
            var result = _service.GetFiltered(null).ToList(); // No filter applied, should return all items

            // Assert
            Assert.Equal(3, result.Count); // All items should be returned
        }
    }
}
