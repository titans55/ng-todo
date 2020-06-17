import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './component/todo.component';
import { TodoCommonModule } from 'src/app/todo-common/todo-common.module';
import { TaskDetailsComponent } from './component/task-details/task-details.component';

@NgModule({
  imports: [CommonModule, TodoCommonModule],
  declarations: [TaskDetailsComponent, TodoComponent],
})
export class TodoModule {}
