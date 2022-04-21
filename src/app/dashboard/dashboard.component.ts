import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {filter, take} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {TaskModel, TasksService} from '../services/tasks.service';
import {openNewOrEditDialog} from './tasks/create-task-dialog/create-task-dialog.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    constructor(private authService: AuthService, private taskService: TasksService, private dialog: MatDialog) {}

    ngOnInit(): void {}

    logout() {
        this.authService.logout();
    }

    createEditTask(task?: TaskModel) {
        openNewOrEditDialog(this.dialog, task)
            .pipe(filter((val) => !!val))
            .subscribe({
                next: (res: any) => {
                    const {title, description} = res;
                    console.log('New or Edited task', res);
                    // API code to create or edit task goes here
                    this.taskService.createTask(title, description);
                },
                error: (error) => {
                    // Handle error
                    console.log(error);
                    // this.snackbar.open('Error', error.error.message, {duration: 4000});
                },
            });
    }
}
