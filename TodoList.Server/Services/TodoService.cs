using System;
using System.Collections.Generic;
using TodoList.Server.Models;

namespace TodoList.Server.Services
{
    public class TodoService : ITodoService
    {
        private readonly Dictionary<long, TodoItem> _todos = new Dictionary<long, TodoItem>();
        private long _nextId = 1;
        // Logic to get All
        public IEnumerable<TodoItem> GetAll()
        {
            return _todos.Values;
        }
        // Logic to get Item by ID
        public TodoItem GetById(long id)
        {
            _todos.TryGetValue(id, out TodoItem item);
            return item;
        }
        // Logic to Add
        public void Add(TodoItem item)
        {
            lock (_todos)
            {
                item.Id = _nextId++;
                _todos[item.Id] = item;
                Console.WriteLine($"Item added: Id={item.Id}, Name={item.Name}, IsComplete={item.IsComplete}");
            }
        }

        // Logic to update
        public void Update(TodoItem item)
        {
            lock (_todos)
            {
                if (_todos.ContainsKey(item.Id))
                {
                    var existingItem = _todos[item.Id];
                    existingItem.IsComplete = item.IsComplete; 
                    Console.WriteLine($"Item updated: Id={item.Id}, IsComplete={item.IsComplete}");
                }
            }
        }

        // Logic to Delete
        public void Delete(long id)
        {
            lock (_todos)
            {
                if (_todos.ContainsKey(id))
                {
                    _todos.Remove(id);
                    Console.WriteLine($"Item deleted: Id={id}");
                }
            }
        }
        // Logic to  Complete Task when Toggled
        public void ToggleComplete(long id, bool isComplete)
        {
            if (_todos.ContainsKey(id))
            {
                
                var item = _todos[id];
                item.IsComplete = !item.IsComplete; 
                Console.WriteLine($"Item toggled: Id={id}, IsComplete={item.IsComplete}");
            }
        }
        // Logic to Filter
        public IEnumerable<TodoItem> GetFiltered(bool? isComplete)
        {
            if (!isComplete.HasValue)
            {
                return _todos.Values; 
            }

            return _todos.Values.Where(todo => todo.IsComplete == isComplete.Value);
        }


    }
}
