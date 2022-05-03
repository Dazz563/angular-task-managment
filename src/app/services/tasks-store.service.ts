import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, catchError, finalize, map, Observable, tap, throwError} from 'rxjs';
import {AppLoaderService} from './app-loader.service';

export class TaskModel {
    id: string;
    title: string;
    description: string;
    status: string;
    created_at: Date;
    updated_at: Date;
    user_id: string;
}

@Injectable({
    providedIn: 'root',
})
export class TasksStoreService {
    BASE_URL = 'http://localhost:3000';
    private subject = new BehaviorSubject<TaskModel[]>([]);
    tasks$: Observable<TaskModel[]> = this.subject.asObservable();

    constructor(private http: HttpClient, private snackbar: MatSnackBar, private loader: AppLoaderService) {
        this.loadAllTasks();
    }

    loadAllTasks() {
        this.loader.loadingOn();
        const loadTasks$ = this.http
            .get<TaskModel[]>(`${this.BASE_URL}/tasks`)
            .pipe(
                catchError((err) => {
                    const message = 'Could not load tasks!';
                    this.snackbar.open('Oops', message, {duration: 4000});
                    console.log(message, err);
                    return throwError(() => err);
                }),
                tap((tasks) => this.subject.next(tasks)),
                finalize(() => this.loader.loadingOff())
            )
            .subscribe();

        // this.loader.showLoaderUntilCompleted(loadTasks$).subscribe();
    }

    filterBySearch(search: string) {
        return this.http.get<TaskModel[]>(`${this.BASE_URL}/tasks?search=${search}`).pipe(
            map((tasks) => {
                this.subject.next(tasks);
            })
        );
    }

    filterByStatus(status: string) {
        return this.http.get<TaskModel[]>(`${this.BASE_URL}/tasks?status=${status}`).pipe(
            map((tasks) => {
                this.subject.next(tasks);
            })
        );
    }

    // Create new task
    createTask(title: string, description: string) {
        // Loader
        // this.loader.open();
        this.http.post(`${this.BASE_URL}/tasks`, {title, description}).subscribe({
            next: (taskRes: TaskModel) => {
                // Reactive local state management
                const tasks = this.subject.getValue();
                tasks.push(taskRes);
                this.subject.next(tasks);
                // Loader
                // this.loader.close();
                // Handle success notification
                this.snackbar.open('Success', 'Task Created', {duration: 4000});
            },
            error: (error) => {
                // Handle error
                console.log(error);
                // Loader
                // this.loader.close();
                // Handle error notification
                this.snackbar.open('Oops', 'Something went wrong!', {duration: 4000});
            },
        });
    }

    // Update task status
    updateTaskStatus(id: string, status: string) {
        // Reactive
        const tasks = this.subject.getValue();
        const taskIndex = tasks.findIndex((task) => task.id == id);
        const newTasks = [...tasks];
        newTasks[taskIndex] = {
            ...tasks[taskIndex],
            status,
        };
        this.subject.next(newTasks);
        this.http
            .patch(`${this.BASE_URL}/tasks/${id}/status`, {status: status})
            .pipe(
                catchError((err) => {
                    const message = 'Could not update status';
                    console.log(message, err);
                    this.snackbar.open('Oops', message, {duration: 4000});
                    return throwError(() => err);
                })
            )
            .subscribe();
    }

    // Delete task
    deleteTask(id: string) {
        // this.loader.open();
        this.http.delete(`${this.BASE_URL}/tasks/${id}`).subscribe({
            next: (taskRes: TaskModel) => {
                console.log(taskRes);
                // Reactive
                const tasks = this.subject.getValue();
                const newTasks = tasks.filter((task) => task.id != id);
                this.subject.next(newTasks);
                // Loader
                // this.loader.close();
                // Handle success notification
                this.snackbar.open('Success', 'Deleted successfully', {duration: 4000});
            },
            error: (error) => {
                // Handle error
                console.log(error);
                // Loader
                // this.loader.close();
                // Handle error notification
                this.snackbar.open('Oops', 'Something went wrong!', {duration: 4000});
            },
        });
    }
}
