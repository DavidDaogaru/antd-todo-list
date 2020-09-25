import React, { useState, useContext } from "react";
import * as helper from "../helper";
import { TodoList } from "../components/TodoList";
import { CreateTodoInput } from "../components/CreateTodoInput";
import { ITodo, Todo } from "../types";

export const todoContext = React.createContext({
  todos: [],
  actions: {
    createTodoItem: () => undefined,
    updateTodoItem: () => undefined,
    removeTodoItem: () => undefined
  }
});

export const TodoProvider = ({ children, initialTodos }) => {
  const [todos, setTodos] = useState(initialTodos);
  const removeTodoItem = (todoId: number) => {
    setTodos(helper.remove(todos, todoId));
  };

  const createTodoItem = (todoTitle: string) => {
    setTodos(helper.create(todos, new Todo(todoTitle)));
  };

  const updateTodoItem = (todoId: number, todo: ITodo) => {
    setTodos(helper.update(todos, todoId, todo));
  };

  return (
    <todoContext.Provider
      value={{
        todos,
        actions: {
          createTodoItem,
          removeTodoItem,
          updateTodoItem
        }
      }}
    >
      {children}
    </todoContext.Provider>
  );
};

const ContextHookTodoList = () => {
  const { actions, todos } = useContext(todoContext);
  return (
    <React.Fragment>
      <h1>Context Hook Todo</h1>
      <CreateTodoInput createTodoItem={actions.createTodoItem} />
      <TodoList
        todos={todos}
        removeTodoItem={actions.removeTodoItem}
        updateTodoItem={actions.updateTodoItem}
      />
    </React.Fragment>
  );
};

export const ContextHookTodoApp = ({ initialState: { todos } }) => {
  return (
    <TodoProvider initialTodos={todos}>
      <ContextHookTodoList />
    </TodoProvider>
  );
};
