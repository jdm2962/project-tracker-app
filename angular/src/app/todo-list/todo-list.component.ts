import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { TodoService } from "../todo.service";


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Output() finishedUpdate = new EventEmitter();

  todos = [];


  constructor(
    private todoService : TodoService
  ) { }

  ngOnInit() : void
  {
    this.todos = this.todoService.getTodos();
  }

  updateList()
  {
    console.log('update ran');
    this.todos = this.todoService.getTodos();
  }

  finishedTodo(todo)
  {
    this.finishedUpdate.emit(todo);
    console.log("parent emit");
  }


  markAllDone()
  {
    for(let todo of this.todos)
    {
      this.todoService.addFinishedTodo(todo);
      this.todoService.deleteTodo(todo);
    }
    this.updateList();
  }


  deleteAllTodos()
  {
    for(let todo of this.todos)
    {
      this.todoService.deleteTodo(todo);
    }
    console.log(this.todos);
    this.updateList();
  }

  saveToDb()
  {

  }

}
