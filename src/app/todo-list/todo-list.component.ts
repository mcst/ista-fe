import {Component, OnInit} from '@angular/core';

import {Todo} from '../todo';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];

  constructor(
    private apiService: ApiService) {
  }

  getTodos() {
    this.apiService.todoChangesSubject
      .subscribe(todo => this.todos.unshift(todo));
    this.apiService.getTodos()
      .subscribe(todos => this.todos = todos?.items);
  }

  updateTodos(nextTodo: Todo){
    this.todos = this.todos?.map(todo => {
      if (todo.id === nextTodo.id) {
        return nextTodo;
      }
      return todo;
    });
  }

  onCheck(t: Todo): void {
    t.finished = !t.finished;
    this.apiService.updateTodo(t).subscribe(nextTodo => this.updateTodos(nextTodo));
  }

  markTodo(t: Todo){
    t.marked = true;
    this.apiService.updateTodo(t).subscribe(nextTodo => this.updateTodos(nextTodo));
  }

  getUnmarkedTodos(){
    return this.todos.filter(todo => !todo.marked);
  }

  ngOnInit(): void {
    this.getTodos();
  }

}
