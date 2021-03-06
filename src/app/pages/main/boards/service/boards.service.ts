import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { TodoService } from '../../todo/service/todo.service';
import { Board } from '../../todo/model/task';
import { UserModel, BoardInfo } from 'src/app/pages/auth/model/user.model';
@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(public afs: AngularFirestore, private todoService: TodoService) {}

  getBoardIds(userId: string): string[] {
    return [];
  }

  createNewBoard(currentBoards: Array<BoardInfo>, userId: string): void {
    let boardId: string = this.afs.createId();
    const boardDetailRef: AngularFirestoreDocument<Board> = this.afs.doc(
      `boards/` + boardId
    );
    const userRef: AngularFirestoreDocument<UserModel> = this.afs.doc(
      `users/` + userId
    );
    let newBoardDetails: Board = {
      boardName: 'New board',
      content: this.todoService.getInitialTodos(),
    };

    boardDetailRef.set(newBoardDetails, { merge: true });
    currentBoards.push({
      boardDetailRef: boardDetailRef.ref,
    });
    userRef.update({
      boards: currentBoards,
    });
  }
}
