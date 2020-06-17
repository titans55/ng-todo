import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task, Check } from '../../model/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  @Input() task!: Task;
  @Output() onSave: EventEmitter<void> = new EventEmitter();

  initialTask: Task;

  constructor() {}

  ngOnInit() {
    console.log('dialog initialized');
    this.initialTask = this.cloneObj(this.task);
  }

  addCheckToTaskChecklist(task: Task) {
    let newCheck: Check = {
      label: 'New check',
      checked: false,
    };
    task.checklist.push(newCheck);
    setTimeout(() => {
      let checks = <any>document.getElementsByClassName('input-check-of-task');
      if (checks && checks.length) {
        checks[checks.length - 1].focus();
      }
    });
  }

  cancelChanges() {
    this.task = this.cloneObj(this.initialTask);
  }

  saveChanges() {
    this.onSave.emit();
  }

  private cloneObj<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
