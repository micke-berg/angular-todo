import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../Interfaces/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(30px)',
        }),
        animate(200, style({ opacity: 1, transform: 'translateY(0px)' })),
      ]),
      transition(':leave', [
        animate(200, style({ opacity: 0, transform: 'translateY(30px)' })),
      ]),
    ]),
  ],
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;

  constructor() {}

  ngOnInit(): void {
    this.filter = 'all';
    this.beforeEditCache = '';
    this.idForTodo = 4;
    this.todoTitle = '';
    this.todos = [
      {
        id: 1,
        title: 'Finish Angular Screencast',
        completed: false,
        editing: false,
      },
      {
        id: 2,
        title: 'Take over world',
        completed: false,
        editing: false,
      },
      {
        id: 3,
        title: 'One more thing',
        completed: false,
        editing: false,
      },
    ];
  }

  addTodo(): void {
    if (this.todoTitle.trim().length == 0) {
      return;
    }
    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false,
    });
    this.todoTitle = '';
    this.idForTodo++;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length == 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo) {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  remaining(): number {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter((todo) => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  // TODO: Fix later. Event not working. Deprecated
  checkAllTodos(): void {
    // this.todos.forEach(
    //   (todo) => (todo.completed = (<HTMLInputElement>event.target).checked)
    // );
    console.log('check all todos');
  }

  todosFiltered(): Todo[] {
    if (this.filter == 'all') {
      return this.todos;
    } else if (this.filter == 'active') {
      return this.todos.filter((todo) => !todo.completed);
    } else if (this.filter == 'completed') {
      return this.todos.filter((todo) => todo.completed);
    }
    return this.todos;
  }
}
