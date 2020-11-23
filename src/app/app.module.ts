import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ToDoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

import { HeaderComponent } from './components/layout/header/header.component';
import { MaterialModule } from './material/material.module';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    ToDoItemComponent,
    HeaderComponent,
    TodoInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
