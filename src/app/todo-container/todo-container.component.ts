import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent implements OnInit {


  finishedTodo : {};

  constructor() { }

  ngOnInit(): void
  {

  }

  updateFinished(todo)
  {
    console.log("Grandparent got the emit!");
    this.finishedTodo = todo;
  }

}
