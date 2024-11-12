import { useTodoContext } from "../context/TodoContext";
import {
  List,
  ListItem,
  Card,
  CardContent,
  IconButton,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const TodoListDisplay = () => {
  const { todos, toggleTodoStatus, deleteTodo, loading } = useTodoContext();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {todos.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary" mt={4}>
          No tasks found
        </Typography>
      ) : (
        <List sx={{ width: "100%", maxWidth: 500, margin: "auto" }}>
          {todos.map((todo) => (
            <ListItem key={todo.id} disablePadding sx={{ mb: 2 }}>
              <Card
                variant="outlined"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <CardContent
                  onClick={() => toggleTodoStatus(todo.id)}
                  sx={{ flexGrow: 1, cursor: "pointer" }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: todo.isComplete ? "line-through" : "none",
                      fontWeight: todo.isComplete ? "normal" : "bold",
                      wordBreak: "break-word", // Allow long words to break if they are too long for the container.
                      overflowWrap: "anywhere", // Prevent overflow for long unbreakable strings.
                    }}
                  >
                    {todo.name}
                  </Typography>
                </CardContent>
                <IconButton
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="delete"
                  sx={{ m: 1 }}
                >
                  <DeleteOutlineIcon sx={{ color: "black" }} />
                </IconButton>
              </Card>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default TodoListDisplay;
