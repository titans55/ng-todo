import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header.component';
import { TodoCommonModule } from 'src/app/todo-common/todo-common.module';

@NgModule({
  imports: [CommonModule, TodoCommonModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule { }
