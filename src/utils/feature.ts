export const saveTodos = (todo: TodoItemType[]): void => {
  localStorage.setItem("mytodo", JSON.stringify(todo));
};
export const getTodos = (): TodoItemType[] => {
  const todos = localStorage.getItem("mytodo");
  return todos ? JSON.parse(todos) : [];
};
