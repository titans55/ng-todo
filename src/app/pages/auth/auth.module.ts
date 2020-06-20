import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './component/auth.component';
import { TodoCommonModule } from 'src/app/todo-common/todo-common.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatButtonModule, TodoCommonModule],
  declarations: [AuthComponent],
})
export class AuthModule {}
