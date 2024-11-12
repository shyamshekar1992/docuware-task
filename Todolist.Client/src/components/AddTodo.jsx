import  { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import { TextField, Button, Box } from "@mui/material";

const AddTodo = () => {
  const { addTodo } = useTodoContext();
  const [name, setName] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addTodo({ name, isComplete: false });
      setName("");
    }
  };

  return (
    <Box
      mb={4}
      component="form"
      onSubmit={handleAddTodo}
      style={{ display: "flex", gap: "10px", alignItems: "center" }}
    >
      <TextField
        label="Add a new todo"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          height: "56px",
          px: 3,
          backgroundColor: "#000",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddTodo;
