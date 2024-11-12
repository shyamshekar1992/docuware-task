using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TodoList.Server.Services;
using TodoList.Server.Models;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly ITodoService _todoService;

    public TodoController(ITodoService todoService)
    {
        _todoService = todoService;
    }
    //Helper function for readbility
    private bool IsItemNotFound(long id){
        var existingItem = _todoService.GetById(id);
        if (existingItem == null)
        {
            return true;
        }
      return false;
    }
    // Get All
    [HttpGet]
    public ActionResult<IEnumerable<TodoItem>> Get()
    {
        return Ok(_todoService.GetAll());
    }
    //Get By ID
    [HttpGet("{id}")]
    public ActionResult<TodoItem> GetById(long id)
    {
        if(IsItemNotFound(id)){ return NotFound();}
        return Ok(id);
    }
    // Add Item
    [HttpPost]
    public ActionResult Add(TodoItem item)
    {
        _todoService.Add(item);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }
    // Update
    [HttpPut("{id}")]
    public ActionResult Update(long id, [FromBody] TodoItem item) 
    {
        if (id != item.Id)
        {
            return BadRequest("ID mismatch between URL and item ID.");
        }

       if(IsItemNotFound(id)){ return NotFound();}

        _todoService.Update(item);
        return NoContent();
    }

    //Delete
    [HttpDelete("{id}")]
    public ActionResult Delete(long id)
    {
        if(IsItemNotFound(id)){ return NotFound();}

        _todoService.Delete(id);
        return NoContent();
    }

    // Filter
    [HttpGet("filter")]
    public ActionResult<IEnumerable<TodoItem>> GetFiltered([FromQuery] bool? isComplete)
    {
        var todos = _todoService.GetFiltered(isComplete);
        return Ok(todos);
    }
    // Update the status
    [HttpPatch("{id}/status")]
    public IActionResult UpdateStatus(long id, [FromBody] bool isComplete)
    {
       if (IsItemNotFound(id)) return NotFound();
        var updateItem = _todoService.GetById(id);
        updateItem.IsComplete = isComplete;
        _todoService.Update(updateItem);
        return NoContent();
    }
    // Mark as complete when toggled
    [HttpPut("{id}/toggle")]
    public ActionResult ToggleComplete(long id, [FromBody] bool isComplete)
    {
       if(IsItemNotFound(id)){ return NotFound();}

        _todoService.ToggleComplete(id, isComplete);
        return NoContent();
    }
   
}
