import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, Observable, take, tap} from 'rxjs';

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
    BASE_URL = 'https://arcane-fjord-24138.herokuapp.com';
    constructor(private http: HttpClient, private snackbar: MatSnackBar) {
        this.getTasks().subscribe((res) => {
            this.subject.next(res);
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

    // Create new task
    createTask(title: string, description: string) {
        this.http.post(`${this.BASE_URL}/tasks`, {title, description}).subscribe({
            next: (taskRes: TaskModel) => {
                console.log(taskRes);
                // Reactive
                const tasks = this.subject.getValue();
                const newTasks = [...tasks];
                newTasks.push(taskRes);
                this.subject.next(newTasks);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    // Update task status
    updateTaskStatus(id: string, status: string) {
        console.log('Status in service', status);
        this.http.patch(`${this.BASE_URL}/tasks/${id}/status`, {status: status}).subscribe({
            next: (taskRes: TaskModel) => {
                console.log(taskRes);
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
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    // Delete task
    deleteTask(id: string) {
        this.http.delete(`${this.BASE_URL}/tasks/${id}`).subscribe({
            next: (taskRes: TaskModel) => {
                console.log(taskRes);
                // Reactive
                const tasks = this.subject.getValue();
                const newTasks = tasks.filter((task) => task.id != id);
                this.subject.next(newTasks);
                this.snackbar.open('Delete', 'Deleted successfully', {duration: 4000});
            },
            error: (error) => {
                console.log(error);
            },
        });
    }
}
