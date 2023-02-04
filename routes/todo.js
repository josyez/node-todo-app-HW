import express from "express";
import { nanoid } from "nanoid";


export default function setupTodoRouter(db) {
  const router = express.Router();

  //Create our GET route that just sends back the Todos data
  router.get("/", function (_request, response) {
    //The underscore means to ignore the param that's not being used
    response.status(200).json({
      //Set our response to have a status of 200 (OK!) and to respond with JSON
      success: true,
      todos: db.data.todos, //Returns the todos from our DB
    });
  });

  router.post("/", function (request, response) {
    //Push the new todo
    db.data.todos.push({
      id: nanoid(4),
      name: request.body.todo,
    });

    //Save the todo to the "database"
    db.write();

    //Respond with 200 (OK!) and tell the user the request is successful
    response.status(200).json({
      success: true,
    });
  });

  router.put("/:todo", function (request, response) {
    const todo = request.params.todo;
    console.log(todo);

    const todoIndex = db.data.todos.findIndex(
      (currentTodo) => currentTodo.id === todo
    );

    db.data.todos[todoIndex].name = request.body.todo;

    db.write();

    response.status(200).json({
      success: true,
    });
  });

  router.delete("/:todo", function (request, response) {
    const todo = request.params.todo;

    const todoIndex = db.data.todos.findIndex(
      (currentTodo) => currentTodo.id === todo
    );

    db.data.todos.splice(todoIndex, 1);

    db.write();

    response.status(200).json({
      success: true,
    });
  });

  return router;
}
