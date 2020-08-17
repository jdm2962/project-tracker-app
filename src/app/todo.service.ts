import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  todos = [];
  finishedTodos = [];
  todo : string;

  constructor(
    private http:HttpClient
  ) { }

  getTodos()
  {
    return this.todos;
  }

  getFinishedTodos()
  {
    return this.finishedTodos;
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

  addFinishedTodo(todo)
  {
    this.finishedTodos.push(todo);
    console.log(this.finishedTodos);
  }


  deleteTodo(todo)
  {
    let id = todo.id;
    let newTodos = this.todos.filter(todo => todo.id !== id);
    this.todos = newTodos;
    console.log(this.todos);

  }

  deleteFinishedTodos()
  {
    this.finishedTodos = [];
  }

  updateTodo(todo)
  {

  }

}
