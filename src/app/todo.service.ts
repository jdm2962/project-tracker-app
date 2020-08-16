import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  todos = [];
  todo : string;

  constructor(
    private http:HttpClient
  ) { }

  getTodos()
  {
    return this.todos;
  }

  addTodo(todo)
  {
    let modifiedTodo = {
      "id" : uuidv4(),
      "todo" : todo,
      "done" : false
    }
    this.todos.push(modifiedTodo);
  }

  deleteTodo(todo)
  {
    let id = todo.id;
    let newTodos = this.todos.filter(todo => todo.id !== id);
    this.todos = newTodos;
    console.log(this.todos);

  }

  updateTodo(todo)
  {

  }

}
