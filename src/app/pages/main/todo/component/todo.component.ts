import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from '../service/todo.service';
import { Task, TaskSections, Check, Board } from '../model/task';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  boardIdFromUrl: string;
  board: Board;

  constructor(
    private dialog: MatDialog,
    private todoService: TodoService,
    private afs: AngularFirestore,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.boardIdFromUrl = params.get('boardId');
      this.afs
        .doc(`boards/` + this.boardIdFromUrl)
        .valueChanges()
        .subscribe((board: Board) => {
          this.board = board;
        });
    });
  }

  ngOnInit() {
    // this.todoService.initBoard();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateBoard();
  }

  @ViewChild('taskDetails') taskDetails: TemplateRef<any>;
  displayedTask: Task;
  displayTask(task: Task) {
    this.displayedTask = task;
    let dialogRef = this.dialog.open(this.taskDetails, {
      width: '40vw',
      maxWidth: '40vw',
      minWidth: '320px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        if (result === 'yes') {
          // TODO: Replace the following line with your code.
          console.log('User clicked yes.');
        } else if (result === 'no') {
          // TODO: Replace the following line with your code.
          console.log('User clicked no.');
        }
      }
    });
  }

  addTask(tasks: Array<Task>) {
    let newTask: Task = {
      header: 'New Task',
      checklist: [],
    };
    tasks.push(newTask);
    this.displayTask(tasks[tasks.length - 1]);
  }

  checkedUncheckeds(task: Task): string {
    let numberOfCheckeds: number = task.checklist.filter(
      (check) => check.checked
    ).length;
    return numberOfCheckeds.toString() + '/' + task.checklist.length.toString();
  }

  iconColor(task: Task) {
    if (
      task.checklist.filter((check) => check.checked).length ==
      task.checklist.length
    )
      return 'text-primary';
    return 'text-secondary';
  }

  taskDetailsSaved() {
    this.updateBoard();
  }

  private updateBoard() {
    this.afs.doc(`boards/roU0eSufSc4WsHOzIh7g`).update(this.board);
  }
}
