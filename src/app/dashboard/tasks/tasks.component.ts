import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {concat, concatMap, debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, switchMap, tap} from 'rxjs';
import {TaskModel, TasksService} from 'src/app/services/tasks.service';
import {openNewOrEditDialog} from './create-task-dialog/create-task-dialog.component';
import {openConfirmDeleteDialog} from './delete-task-dialog/delete-task-dialog.component';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, AfterViewInit {
    statuses = ['OPEN', 'IN_PROGRESS', 'DONE'];
    // tasks$: Observable<TaskModel[]>;
    @ViewChild('searchInput') searchInput: ElementRef;
    @ViewChild(MatSelect) select: MatSelect;
    constructor(public taskService: TasksService, private dialog: MatDialog) {}

    ngOnInit(): void {
        // this.tasks$ = this.taskService.tasks$;
    }

    // Search tasks
    ngAfterViewInit(): void {
        // // This time out corrects NG0100: Expression has changed after it was checked
        // setTimeout(() => {
        //     // Search filter
        //     const searchTasks$ = fromEvent<any>(this.searchInput.nativeElement, 'keyup').pipe(
        //         map((event) => event.target.value),
        //         debounceTime(400),
        //         distinctUntilChanged(),
        //         switchMap((search) => this.loadTasks(search))
        //     );
        //     // Status filter
        //     const searchStatus$ = this.select.valueChange.subscribe((status) => {
        //         this.taskService.tasks$ = this.loadTasks(null, status);
        //     });
        //     const initialTasks$ = this.loadTasks();
        //     this.taskService.tasks$ = concat(initialTasks$, searchTasks$);
        // }, 0);
    }

    loadTasks(search = '', status = ''): Observable<TaskModel[]> {
        return this.taskService.getTasks(search, status);
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
                },
            });
    }

    updateStatus(id: string, event: MatSelectChange) {
        let status = event.value;
        this.taskService.updateTaskStatus(id, status);
        console.log(id, status);
    }

    deleteTask(task: TaskModel) {
        openConfirmDeleteDialog(this.dialog)
            .pipe(filter((val) => !!val))
            .subscribe({
                next: (val) => {
                    console.log('Delete task? :', val);
                    // API code to create or edit task goes here
                    if (val) {
                        this.taskService.deleteTask(task.id);
                    }
                },
                error: (error) => {
                    console.log(error);
                },
            });
    }
}
