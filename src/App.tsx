import {
  AppBar,
  Button,
  Container,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TodoItem from "./Components/TodoItem";
import { getTodos, saveTodos } from "./utils/feature";

const App = () => {
  const [todos, setTodo] = useState<TodoItemType[]>(getTodos);
  const [title, settitle] = useState<TodoItemType["title"]>("");
  const completeHandler = (id: TodoItemType["id"]): void => {
    const newtodos: TodoItemType[] = todos.map((e) => {
      if (e.id === id) {
        e.isCompleted = !e.isCompleted;
      }
      return e;
    });
    setTodo(newtodos);
  };
  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 500),
    };
    setTodo((prev) => [...prev, newTodo]);
    settitle("");
  };

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newtodos: TodoItemType[] = todos.filter((e) => e.id != id);
    setTodo(newtodos);
  };
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);
  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>

      <Stack
        overflow={"auto"}
        height={"70%"}
        direction={"column"}
        spacing={"1rem"}
        p={"1rem"}
      >
        {todos.map((i) => (
          <TodoItem
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            key={i.id}
            todo={i}
          />
        ))}
      </Stack>

      <TextField
        onKeyDown={(e) => {
          if (e.key === "Enter" && title !== "") submitHandler();
        }}
        value={title}
        onChange={(e) => settitle(e.target.value)}
        fullWidth
        label={"New Task"}
      />
      <Button
        onClick={submitHandler}
        sx={{ margin: "1rem 0" }}
        fullWidth
        variant="contained"
        disabled={title === ""}
      >
        ADD
      </Button>
    </Container>
  );
};

export default App;
