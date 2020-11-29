import { ThemePalette } from '@angular/material/core';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../Models/todo';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(
          ':enter',
          stagger('200ms', [
            animate(
              '1s ease-in-out',
              keyframes([
                style({ opacity: 0, transform: 'translateY(-18%)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(8px)',
                  offset: 0.2,
                }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
              ])
            ),
          ]),
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class TodoListComponent implements OnInit {
  todo: TodoItem[] = [];

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
  };

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.todo = this.todoService.getTodoList();
    // this.todoService.todoList = JSON.parse(localStorage.getItem('todos'));
  }
}
