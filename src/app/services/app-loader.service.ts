import {Injectable} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {AppLoaderComponent} from '../shared/app-loader/app-loader.component';

@Injectable({
    providedIn: 'root',
})
export class AppLoaderService {
    dialogRef: MatDialogRef<AppLoaderComponent>;
    constructor(private dialog: MatDialog) {}

    public open(title: string = 'Please wait', config = {width: '200px'}): Observable<boolean> {
        this.dialogRef = this.dialog.open(AppLoaderComponent, {
            disableClose: true,
            // backdropClass: 'light-backdrop',
        });
        this.dialogRef.updateSize(config.width);
        this.dialogRef.componentInstance.title = title;
        return this.dialogRef.afterClosed();
    }

    public close() {
        if (this.dialogRef) this.dialogRef.close();
    }
}
