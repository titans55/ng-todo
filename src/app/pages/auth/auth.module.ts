import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './component/auth.component';
import { TodoCommonModule } from 'src/app/todo-common/todo-common.module';

@NgModule({
  imports: [CommonModule, TodoCommonModule],
  declarations: [AuthComponent],
})
export class AuthModule {}
