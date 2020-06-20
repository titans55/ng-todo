import { Component, OnInit } from '@angular/core';
import { BoardsService } from './service/boards.service';
import { AuthService } from '../../auth/service/auth.service';
import { UserModel, BoardInfo } from '../../auth/model/user.model';
import { Router } from '@angular/router';
import { Board } from '../todo/model/task';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
})
export class BoardsComponent implements OnInit {
  user: UserModel;
  boards: Array<Board>;

  constructor(
    private boardsService: BoardsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.boards = [];
      if (this.user) {
        this.user.boards.forEach(async (board) => {
          console.log(board.boardDetailRef.path);
          await this.boardsService.afs
            .doc(board.boardDetailRef.path)
            .valueChanges()
            .subscribe((board: Board) => {
              this.boards.push(board);
            });
        });
      }
    });
  }

  ngOnInit() {}

  navigateToBoard(boardDetailRef: any): void {
    this.router.navigateByUrl(boardDetailRef.path);
  }

  addBoard(): void {
    this.boardsService.createNewBoard(this.user.boards, this.user.uid);
  }

  getBoardName(board: BoardInfo): Promise<string> {
    return board.boardDetailRef.get().then((res) => {
      return (<any>res).boardName;
    });
  }
}
