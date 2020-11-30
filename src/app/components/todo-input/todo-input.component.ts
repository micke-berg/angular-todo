import { ThemePalette } from '@angular/material/core';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
}
@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent implements OnInit {
  todoTitle: string;

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'accent',
  };
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  addTodo(): void {
    if (this.todoTitle.trim().length == 0) {
      return;
    }
    this.todoService.addTodo(this.todoTitle);
    this.todoTitle = '';
  }
}
