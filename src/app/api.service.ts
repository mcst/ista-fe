import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Todo} from './todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private todosUrl = 'http://localhost:8080/api/todos';

  todoChangesSubject = new Subject<Todo>();

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTodos(): Observable<{items: Todo[]}>{
    return this.http.get<{items: Todo[]}>(this.todosUrl).pipe(
        catchError(this.handleError<{items: Todo[]}>('getHeroes', {items: []}))
      );
  }

  addTodo(todo: Todo){
    return this.http.post(this.todosUrl, todo, this.httpOptions).pipe(
     catchError(this.handleError<any>('post todo'))
    );
  }

  updateTodo(todo: Todo){
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.warn('Error', error);
      return of(result as T);
    };
  }
}
