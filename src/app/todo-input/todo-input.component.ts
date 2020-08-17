import { Component, OnInit } from '@angular/core';

import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  todoValue : string;

  constructor(
    private todoService : TodoService
  ) { }

  ngOnInit(): void
  {
  }

  addTodo()
  {

    let input = document.getElementById("todoInput");

    if(this.todoValue !== "")
    {
      this.todoService.addTodo(this.todoValue.trim());
      this.todoValue = "";
      input["value"] = "";
    }


  }

  updateValue(value)
  {
    this.todoValue = value;
  }


  addTodoEnter()
  {
    if(this.todoValue !== "")
    {
      console.log("addTodoEnter ran");
      let button = document.getElementById("inputButton");
      button.click();
    }

  }

}


