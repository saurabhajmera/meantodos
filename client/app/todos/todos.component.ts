/**
 * Created by sajmera on 12/27/16.
 */
import { Component } from '@angular/core';
import {TodoService} from "../services/todo.service";
import {Todo} from "../Todo";

@Component({
  moduleId:module.id,
  selector: 'todos',
  templateUrl: './todos.component.html',
  providers:[TodoService],
})
export class TodosComponent  {
  todos: Todo[];
  todoText:string;
  constructor(private _todoService:TodoService){
    // this.todoText="Add Todo..";

  }

  ngOnInit(){
    this.todos=[];
    this.getTodos();
  }

  getTodos(){
    this._todoService.getTodos().subscribe(todos=>{
      this.todos = todos;
      console.log(this.todos);
    });
  }

  createTodo(event:any,todoText:any){
    var todo = new Todo();
    todo.text = todoText;
    todo.isCompleted = false;
    this._todoService.createTodo(todo).subscribe(() => {
      this.todos.push(todo);
      this.todoText="";
    });
  }


}
