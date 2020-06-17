import { Component, OnInit } from '@angular/core';
import { BoardsService } from './service/boards.service';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../auth/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
})
export class BoardsComponent implements OnInit {
  user: User;

  constructor(
    private boardsService: BoardsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}

  navigateToBoard(boardDetailRef: any): void {
    this.router.navigateByUrl(boardDetailRef.path);
  }

  addBoard(): void {
    this.boardsService.createNewBoard(this.user.boards, this.user.uid);
  }
}
