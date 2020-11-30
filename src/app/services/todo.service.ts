import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { TodoItem } from '../Models/todo';
import { StorageService } from './storage.service';

const todoListStorageKey = 'todos';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todosChanged = new EventEmitter<TodoItem[]>();
  todoTitle: string = '';
  idForTodo: number = 4;
  beforeEditCache: string = '';
  filter: string = 'all';
  anyRemainingModel: boolean = true;
  todoList: TodoItem[];

  constructor(private storageService: StorageService) {
    this.todoList = storageService.getData(todoListStorageKey) || [];
  }

  getData(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  saveToStorage(): void {
    console.log('save to storage');
    this.storageService.setData(todoListStorageKey, this.todoList);
    this.todosChanged.emit(this.todoList.slice());
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
    this.todosChanged.emit(this.todoList.slice());
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
    console.log('clearCompleted');
    this.todoList = this.todoList.filter((todo) => !todo.completed);
    this.saveToStorage();
    this.anyRemainingModel = true;
  }

  checkAllTodos(): void {
    console.log('checkAllTodos');
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

  getTodoList() {
    return this.todoList;
  }
}
