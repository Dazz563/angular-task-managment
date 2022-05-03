import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {TaskModel} from 'src/app/services/tasks-store.service';

@Component({
    selector: 'app-create-task-dialog',
    templateUrl: './create-task-dialog.component.html',
    styleUrls: ['./create-task-dialog.component.scss'],
})
export class CreateTaskDialogComponent implements OnInit {
    form: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) private task: TaskModel, private dialogRef: MatDialogRef<CreateTaskDialogComponent>) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            title: new FormControl(this.task.title, Validators.required),
            description: new FormControl(this.task.description, Validators.required),
        });
    }

    close() {
        this.dialogRef.close();
    }

    save() {
        this.dialogRef.close(this.form.value);
    }
}

export function openNewOrEditDialog(dialog: MatDialog, task: TaskModel) {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.minWidth = 370;
    // config.height = 'px';
    config.backdropClass = 'backdrop-color';
    config.data = {
        ...task,
    };

    const dialogRef = dialog.open(CreateTaskDialogComponent, config);

    return dialogRef.afterClosed();
}
