import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../Models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class ToDoItemComponent implements OnInit {
  @Input() todo: Todo;

  constructor(public todoService: TodoService) {}

  ngOnInit(): void {}
}
