import { Injectable } from '@angular/core';
import { Task, TaskSections, Board } from '../model/task';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private afs: AngularFirestore) {}

  getInitialTodos(): TaskSections {
    let TaskSections: TaskSections = {
      todo: [
        {
          header: 'New Task',
          checklist: [{ label: 'do this', checked: false }],
        },
      ],
      doing: [],
      done: [],
    };
    return TaskSections;
  }

  initBoard(): void {
    const board: AngularFirestoreDocument<Board> = this.afs.doc(
      `boards/roU0eSufSc4WsHOzIh7g`
    );
    let data: Board = {
      boardName: 'first board',
      content: this.getInitialTodos(),
    };
    board.set(data, { merge: true });
  }
}
