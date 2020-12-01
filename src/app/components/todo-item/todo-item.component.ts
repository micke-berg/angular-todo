import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../Models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class ToDoItemComponent implements OnInit {
  todo: TodoItem[] = [];
  todoTitle: string;

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.$todo.subscribe((todo) => {
      this.todo = todo;
    });
  }
}
