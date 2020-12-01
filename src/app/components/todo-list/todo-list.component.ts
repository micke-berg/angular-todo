import { ThemePalette } from '@angular/material/core';
import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../Models/todo';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger,
} from '@angular/animations';
import { TodoService } from '../../services/todo.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
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
          stagger('300ms', [
            animate(
              '1s ease-out',
              keyframes([
                style({ opacity: 0, transform: 'translateY(-25%)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(15px)',
                  offset: 0.3,
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
    this.todoService.$todo.subscribe((todo) => {
      this.todo = todo;
    });
  }
}
