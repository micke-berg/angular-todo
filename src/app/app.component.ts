import { TodoItem } from './Models/todo';
import { TodoService } from './services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoService],
})
export class AppComponent implements OnInit {
  title = 'Angular-Todo-App';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}
}
