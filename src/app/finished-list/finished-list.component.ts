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
    // this.finishedTodos.push(finishedTodo);
  }



  constructor(
    private todoService : TodoService
  ) { }

  ngOnInit(): void
  {
    this.finishedTodos = this.todoService.getFinishedTodos();
  }

  updateFinishedTodos()
  {
    this.finishedTodos = this.todoService.getFinishedTodos();
  }

  clearFinishedTodos()
  {
    if(this.finishedTodos.length > 0)
    {
      this.todoService.deleteFinishedTodos();
      this.updateFinishedTodos();
    }
    else
    {
      console.log("nothing to clear")
    }

  }


}
