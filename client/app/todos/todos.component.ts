/**
 * Created by sajmera on 12/27/16.
 */
import { Component } from '@angular/core';
import {TodoService} from "../services/todo.service";
import {Todo} from "../Todo";
import 'rxjs/add/operator/map';

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

  updateStatus(todo:any){
    var _todo ={
      _id:todo._id,
      text:todo.text,
      isCompleted:!todo.isCompleted
    };

    this._todoService.updateTodo(_todo)
      .subscribe(() => {
        todo.isCompleted = !todo.isCompleted;
      });
  }

  setEditState(todo:any){
    todo.isEditMode = !todo.isEditMode;
  }

  updateTodoText(event: any, todo: any) {
    if (event.which === 13) {
      todo.text = event.target.value;

      var _todo = {
        _id: todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted
      };

      this._todoService.updateTodo(_todo)
        .subscribe(() => {
          todo.text = _todo.text;
          todo.isEditMode = false;

        });
    }
  }


}
