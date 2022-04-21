import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-delete-task-dialog',
    templateUrl: './delete-task-dialog.component.html',
    styleUrls: ['./delete-task-dialog.component.scss'],
})
export class DeleteTaskDialogComponent implements OnInit {
    constructor(private dialogRef: MatDialogRef<DeleteTaskDialogComponent>) {}

    ngOnInit(): void {}

    close() {
        this.dialogRef.close(false);
    }

    save() {
        this.dialogRef.close(true);
    }
}

export function openConfirmDeleteDialog(dialog: MatDialog) {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.minWidth = 370;
    config.backdropClass = 'backdrop-color';

    const dialogRef = dialog.open(DeleteTaskDialogComponent, config);

    return dialogRef.afterClosed();
}
