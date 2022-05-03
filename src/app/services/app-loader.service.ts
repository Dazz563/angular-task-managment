import {Injectable} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, concatMap, finalize, Observable, of, tap} from 'rxjs';
import {AppLoaderComponent} from '../shared/app-loader/app-loader.component';

@Injectable({
    providedIn: 'root',
})
export class AppLoaderService {
    dialogRef: MatDialogRef<AppLoaderComponent>;
    constructor(private dialog: MatDialog) {}

    // private loadingSubject = new BehaviorSubject<boolean>(false);
    // loading$: Observable<boolean> = this.loadingSubject.asObservable();

    // showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    //     return of(null).pipe(
    //         tap(() => this.loadingOn()),
    //         concatMap(() => obs$),
    //         finalize(() => this.loadingOff())
    //     );
    // }

    loadingOn(title: string = 'Please wait', config = {width: '200px'}) {
        // Reactive state
        // this.loadingSubject.next(true);

        this.dialogRef = this.dialog.open(AppLoaderComponent, {
            disableClose: true,
            // backdropClass: 'light-backdrop',
        });
        this.dialogRef.updateSize(config.width);
        this.dialogRef.componentInstance.title = title;
        return this.dialogRef.afterClosed();
    }

    loadingOff() {
        // Reactive state
        // this.loadingSubject.next(false);
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }
}
