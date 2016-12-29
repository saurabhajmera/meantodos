"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by sajmera on 12/27/16.
 */
var core_1 = require('@angular/core');
var todo_service_1 = require("../services/todo.service");
var Todo_1 = require("../Todo");
require('rxjs/add/operator/map');
var TodosComponent = (function () {
    function TodosComponent(_todoService) {
        // this.todoText="Add Todo..";
        this._todoService = _todoService;
    }
    TodosComponent.prototype.ngOnInit = function () {
        this.todos = [];
        this.getTodos();
    };
    TodosComponent.prototype.getTodos = function () {
        var _this = this;
        this._todoService.getTodos().subscribe(function (todos) {
            _this.todos = todos;
            console.log(_this.todos);
        });
    };
    TodosComponent.prototype.createTodo = function (event, todoText) {
        var _this = this;
        var todo = new Todo_1.Todo();
        todo.text = todoText;
        todo.isCompleted = false;
        this._todoService.createTodo(todo).subscribe(function () {
            _this.todos.push(todo);
            _this.todoText = "";
        });
    };
    TodosComponent.prototype.updateStatus = function (todo) {
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };
        this._todoService.updateTodo(_todo)
            .subscribe(function () {
            todo.isCompleted = !todo.isCompleted;
        });
    };
    TodosComponent.prototype.setEditState = function (todo) {
        todo.isEditMode = !todo.isEditMode;
    };
    TodosComponent.prototype.updateTodoText = function (event, todo) {
        if (event.which === 13) {
            todo.text = event.target.value;
            var _todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };
            this._todoService.updateTodo(_todo)
                .subscribe(function () {
                todo.text = _todo.text;
                todo.isEditMode = false;
            });
        }
    };
    TodosComponent.prototype.deleteTodo = function (todo) {
        var _this = this;
        var todos = this.todos;
        this._todoService.deleteTodo(todo._id)
            .subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < todos.length; i++) {
                    if (todos[i]._id === todo._id) {
                        _this.todos.splice(i, 1);
                    }
                }
            }
        });
    };
    TodosComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'todos',
            templateUrl: './todos.component.html',
            providers: [todo_service_1.TodoService],
        }), 
        __metadata('design:paramtypes', [todo_service_1.TodoService])
    ], TodosComponent);
    return TodosComponent;
}());
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todos.component.js.map