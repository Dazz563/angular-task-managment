import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, concat, filter, map, Observable, take, tap} from 'rxjs';
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
export class TasksService {
    private subject = new BehaviorSubject<TaskModel[]>([]);
    tasks$: Observable<TaskModel[]> = this.subject.asObservable();
    // BASE_URL = 'https://arcane-fjord-24138.herokuapp.com';
    BASE_URL = 'http://localhost:3000';
    constructor(private http: HttpClient, private snackbar: MatSnackBar, private loader: AppLoaderService) {
        // Loader
        loader.open();
        this.getTasks().subscribe((res) => {
            this.subject.next(res);
            // Loader
            loader.close();
        });
    }

    // Get all tasks
    getTasks(search?: string, status?: string): Observable<TaskModel[]> {
        if (search) {
            return this.http.get<TaskModel[]>(`${this.BASE_URL}/tasks?search=${search}`);
        } else if (status) {
            return this.http.get<TaskModel[]>(`${this.BASE_URL}/tasks?status=${status}`);
        } else {
            return this.http.get<TaskModel[]>(`${this.BASE_URL}/tasks`);
        }
    }

    filterTasksBySearch(search: string, status: string) {
        if (search) {
            let filteredSearch$ = this.getTasks(search);
            filteredSearch$.subscribe({
                next: (res) => {
                    console.log('Service filter res: ', res);
                    // Reactive
                    this.subject.next(res);
                },
            });
        } else if (status) {
            let filteredSearch$ = this.getTasks('', status);
            filteredSearch$.subscribe({
                next: (res) => {
                    console.log('Service filter res: ', res);
                    // Reactive
                    this.subject.next(res);
                },
            });
        } else if ((status = 'ALL')) {
            this.getTasks().subscribe((res) => {
                this.subject.next(res);
            });
        }
    }

    filterTasksByStatus(obs1: Observable<TaskModel[]>, search: string) {
        let filteredSearch$ = this.getTasks(search);
        filteredSearch$.subscribe({
            next: (res) => {
                console.log('Service filter res: ', res);
                // Reactive
                this.subject.next(res);
            },
        });
    }

    // Create new task
    createTask(title: string, description: string) {
        // Loader
        this.loader.open();
        this.http.post(`${this.BASE_URL}/tasks`, {title, description}).subscribe({
            next: (taskRes: TaskModel) => {
                // Reactive
                const tasks = this.subject.getValue();
                const newTasks = [...tasks];
                newTasks.push(taskRes);
                this.subject.next(newTasks);
                // Loader
                this.loader.close();
                // Handle success notification
                this.snackbar.open('Success', 'Task Created', {duration: 4000});
            },
            error: (error) => {
                // Handle error
                console.log(error);
                // Loader
                this.loader.close();
                // Handle error notification
                this.snackbar.open('Oops', 'Something went wrong!', {duration: 4000});
            },
        });
    }

    // Update task status
    updateTaskStatus(id: string, status: string) {
        // Loader
        this.loader.open();
        this.http.patch(`${this.BASE_URL}/tasks/${id}/status`, {status: status}).subscribe({
            next: (taskRes: TaskModel) => {
                // Reactive
                const tasks = this.subject.getValue();
                const taskIndex = tasks.findIndex((task) => task.id == id);
                console.log('Task Index :', taskIndex);
                const newTasks = [...tasks];
                newTasks[taskIndex] = {
                    ...tasks[taskIndex],
                    status,
                };
                this.subject.next(newTasks);
                // Loader
                this.loader.close();
                // Handle success notification
                this.snackbar.open('Success', 'Task Updated', {duration: 4000});
            },
            error: (error) => {
                // Handle error
                console.log(error);
                // Loader
                this.loader.close();
                // Handle error notification
                this.snackbar.open('Oops', 'Something went wrong!', {duration: 4000});
            },
        });
    }

    // Delete task
    deleteTask(id: string) {
        this.loader.open();
        this.http.delete(`${this.BASE_URL}/tasks/${id}`).subscribe({
            next: (taskRes: TaskModel) => {
                console.log(taskRes);
                // Reactive
                const tasks = this.subject.getValue();
                const newTasks = tasks.filter((task) => task.id != id);
                this.subject.next(newTasks);
                // Loader
                this.loader.close();
                // Handle success notification
                this.snackbar.open('Success', 'Deleted successfully', {duration: 4000});
            },
            error: (error) => {
                // Handle error
                console.log(error);
                // Loader
                this.loader.close();
                // Handle error notification
                this.snackbar.open('Oops', 'Something went wrong!', {duration: 4000});
            },
        });
    }
}
