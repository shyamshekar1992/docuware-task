import { TodoProvider } from "./context/TodoContext";
import TodoControls from "./components/TodoControls";
import TodoListDisplay from "./components/TodoListDisplay";
import Header from "./components/Header";
import { Container, styled } from "@mui/material";

// Define a styled component for Container
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(6),
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f1f1f1",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
}));

const App = () => (
  <TodoProvider>
    <Header />
    <StyledContainer>
      <TodoControls />
      <TodoListDisplay />
    </StyledContainer>
  </TodoProvider>
);

export default App;
