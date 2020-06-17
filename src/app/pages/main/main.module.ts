import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { TodoCommonModule } from 'src/app/todo-common/todo-common.module';
import { RouterModule } from '@angular/router';
import { TodoModule } from './todo/todo.module';
import { PartialsModule } from 'src/app/partials/partials.module';
import { BoardsModule } from './boards/boards.module';

@NgModule({
  imports: [
    CommonModule,
    TodoCommonModule,
    RouterModule,
    PartialsModule,
    TodoModule,
    BoardsModule,
  ],
  declarations: [MainComponent],
})
export class MainModule {}
