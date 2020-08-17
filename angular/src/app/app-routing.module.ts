import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoInputComponent } from "./todo-input/todo-input.component";

const routes: Routes =
[
  {path : "", component : TodoInputComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
