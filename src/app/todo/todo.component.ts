import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {TodoService} from "../todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})


export class TodoComponent implements OnInit {

  @Input() todo : {};
  @Output() doUpdate = new EventEmitter<boolean>();
  @Output() finishedUpdate = new EventEmitter();

  constructor(
    private todoService : TodoService
  ) { }

  ngOnInit(): void
  {

  }

  deleteTodo()
  {
    this.todoService.deleteTodo(this.todo);
    this.doUpdate.emit();
  }

  // finishedTodo()
  // {
  //   this.finishedUpdate.emit(this.todo);
  //   console.log("emit");
  //   this.deleteTodo();  // remove from todos
  // }

  todoDone()
  {
    this.todoService.addFinishedTodo(this.todo);
    this.deleteTodo();
  }

}
