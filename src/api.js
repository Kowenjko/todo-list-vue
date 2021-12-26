export const loadTodoList = () =>
  fetch("https://jsonplaceholder.typicode.com/todos?_limit=5").then((todo) =>
    todo.json()
  );
