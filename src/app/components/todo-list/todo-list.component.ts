import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../Models/todo';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoService],
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
  todoTitle: string;

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.todoTitle = '';
    this.todoService.todos = JSON.parse(localStorage.getItem('todos'));
  }

  addTodo(): void {
    if (this.todoTitle.trim().length == 0) {
      return;
    }

    this.todoService.addTodo(this.todoTitle);
    this.todoTitle = '';
  }
}
