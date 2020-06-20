import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialsModule } from '../partials/partials.module';
import { PagesRoutes } from './pages.routing';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TodoCommonModule } from '../todo-common/todo-common.module';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    TodoCommonModule,
    PartialsModule,
    MainModule,
    AuthModule,
    PagesRoutes,
  ],
  declarations: [],
})
export class PagesModule {}
