import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type Propstype = {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  completeHandler: (id: TodoItemType["id"]) => void;
};
const TodoItem = ({ todo, completeHandler, deleteHandler }: Propstype) => {
  const [active, setactive] = useState<boolean>(false);
  const [textval, setTextval] = useState<string>(todo.title);

  return (
    <Paper
      sx={{
        padding: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        {active ? (
          <TextField
            value={textval}
            onChange={(e) => setTextval(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textval !== "") {
                todo.title = textval;
                setactive(false);
              }
            }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeHandler(todo.id)}
        />
        <Button
          onClick={() => {
            setactive((prev) => !prev);
            todo.title = textval;
          }}
          sx={{
            opacity: 0.5,
            color: "black",
          }}
        >
          {active ? "Done" : <Edit />}
        </Button>
        <Button onClick={() => deleteHandler(todo.id)} color="secondary">
          <Delete />
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
