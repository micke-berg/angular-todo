import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TodoItem } from '../Models/todo';
import { StorageService } from './storage.service';

const todoListStorageKey = 'todos';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoTitle: string = '';
  idForTodo: number = 4;
  beforeEditCache: string = '';
  filter: string = 'all';
  anyRemainingModel: boolean = true;
  todoList: TodoItem[] = [];

  private todo = new Subject<TodoItem[]>();
  $todo = this.todo.asObservable();

  constructor(private storageService: StorageService) {
    this.todoList = storageService.getData(todoListStorageKey) || [];
  }

  getData(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  saveToStorage(): void {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }

  addTodo(todoTitle: string): void {
    if (todoTitle.trim().length == 0) {
      return;
    }
    this.todoList.push({
      id: this.idForTodo,
      title: todoTitle,
      completed: false,
      editing: false,
    });
    this.saveToStorage();
    this.todo.next(this.todoList.slice());
    this.idForTodo++;
  }

  deleteTodo(id: number): void {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
    this.saveToStorage();
  }

  editTodo(todo: TodoItem): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
    this.saveToStorage();
  }

  doneEdit(todo: TodoItem): void {
    if (todo.title.trim().length == 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
    this.saveToStorage();
  }

  cancelEdit(todo: TodoItem) {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  remaining(): number {
    return this.todoList.filter((todo) => !todo.completed).length;
  }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  atLeastOneCompleted(): boolean {
    return this.todoList.filter((todo) => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todoList = this.todoList.filter((todo) => !todo.completed);
    this.saveToStorage();
    this.anyRemainingModel = true;
  }

  checkAllTodos(): void {
    this.todoList.forEach(
      (todo) => (todo.completed = (<HTMLInputElement>event.target).checked)
    );
    this.anyRemainingModel = this.anyRemaining();
    this.saveToStorage();
  }

  todosFiltered(): TodoItem[] {
    if (this.filter === 'all') {
      return this.todoList;
    } else if (this.filter === 'active') {
      return this.todoList.filter((todo) => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todoList.filter((todo) => todo.completed);
    }
    return this.todoList;
  }
}
