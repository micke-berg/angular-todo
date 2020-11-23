import { Injectable, OnInit } from '@angular/core';
import { Todo } from '../Models/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoTitle: string = '';
  idForTodo: number = 4;
  beforeEditCache: string = '';
  filter: string = 'all';
  anyRemainingModel: boolean = true;
  todos: Todo[] = [
    {
      id: 1,
      title: 'Make a ToDo list app',
      completed: false,
      editing: false,
    },
    {
      id: 2,
      title: 'Feed the cat',
      completed: false,
      editing: false,
    },
    {
      id: 3,
      title: 'Walk the dog',
      completed: false,
      editing: false,
    },
  ];

  constructor() {}

  saveToStorage(): void {
    console.log('hej');
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(todoTitle: string): void {
    if (todoTitle.trim().length == 0) {
      return;
    }
    this.todos.push({
      id: this.idForTodo,
      title: todoTitle,
      completed: false,
      editing: false,
    });
    this.saveToStorage();
    this.idForTodo++;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveToStorage();
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
    this.saveToStorage();
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length == 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
    this.saveToStorage();
  }

  cancelEdit(todo: Todo) {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  remaining(): number {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter((todo) => todo.completed).length > 0;
  }

  clearCompleted(): void {
    console.log('clearCompleted');
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.saveToStorage();
    this.anyRemainingModel = true;
  }

  checkAllTodos(): void {
    console.log('checkAllTodos');
    this.todos.forEach(
      (todo) => (todo.completed = (<HTMLInputElement>event.target).checked)
    );
    this.anyRemainingModel = this.anyRemaining();
    this.saveToStorage();
  }

  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter((todo) => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter((todo) => todo.completed);
    }
    return this.todos;
  }
}
