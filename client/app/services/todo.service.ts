/**
 * Created by sajmera on 12/28/16.
 */
import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Todo} from "../Todo";
import {Observable} from "rxjs";

@Injectable()
export class TodoService{
  private todos:Todo[];
  constructor(private _http:Http){

  }

  getTodos():Observable<Todo[]>{
    return this._http.get('/api/v1/todos').map(res => res.json());
  }

  createTodo(todo: Todo) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var result =  this._http.post('/api/v1/todo',JSON.stringify(todo),options).map(res=>res.json());
    console.log(result);
    return result;
  }
}
