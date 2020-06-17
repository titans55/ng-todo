import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './boards.component';
import { TodoCommonModule } from 'src/app/todo-common/todo-common.module';

@NgModule({
  imports: [CommonModule, TodoCommonModule],
  declarations: [BoardsComponent],
})
export class BoardsModule {}
