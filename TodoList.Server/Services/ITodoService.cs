using System.Collections.Generic;
using TodoList.Server.Models;

namespace TodoList.Server.Services
{
    public interface ITodoService
    {
        IEnumerable<TodoItem> GetAll();
        TodoItem GetById(long id);
        void Add(TodoItem item);
        void Update(TodoItem item);
        void Delete(long id);
        
       void ToggleComplete(long id, bool isComplete);
        IEnumerable<TodoItem> GetFiltered(bool? isComplete);
    }
}
