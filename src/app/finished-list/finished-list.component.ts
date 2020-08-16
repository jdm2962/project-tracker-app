import { Component, OnInit, Input} from '@angular/core';

import { TodoService } from "../todo.service";

@Component({
  selector: 'app-finished-list',
  templateUrl: './finished-list.component.html',
  styleUrls: ['./finished-list.component.css']
})
export class FinishedListComponent implements OnInit {

 finishedTodos = [];

  @Input()
  set finishedTodo(finishedTodo : {})
  {
    this.finishedTodos.push(finishedTodo);
  }



  constructor() { }

  ngOnInit(): void
  {

  }


}
