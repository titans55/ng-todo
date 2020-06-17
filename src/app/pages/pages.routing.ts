import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/component/auth.component';
import { TodoComponent } from './main/todo/component/todo.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { BoardsComponent } from './main/boards/boards.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: BoardsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'boards/:boardId',
        component: TodoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'landing',
        component: AuthComponent,
      },
    ],
  },
];

export const PagesRoutes = RouterModule.forChild(routes);
