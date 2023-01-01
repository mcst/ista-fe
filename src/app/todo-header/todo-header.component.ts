import { Component, OnInit } from '@angular/core';
import {Todo} from '../todo';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent implements OnInit {
  todo?: Todo = {
    content: undefined,
    id: undefined,
    finished: false,
    marked: false
  };
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onInput(ev: any){
    const {value} = ev.currentTarget;
    this.todo.content = value;
  }

  save(): void {
    if (this.todo.content) {
      this.apiService.addTodo(this.todo)
        .subscribe(todo => {
          this.apiService.todoChangesSubject.next(todo);
          this.todo = {id: undefined, content: undefined};
        });
    }
  }
}
