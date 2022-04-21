import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard.routing';
import {SharedModule} from '../shared/shared.module';
import {TasksComponent} from './tasks/tasks.component';
import { CreateTaskDialogComponent } from './tasks/create-task-dialog/create-task-dialog.component';
import { DeleteTaskDialogComponent } from './tasks/delete-task-dialog/delete-task-dialog.component';

@NgModule({
    declarations: [DashboardComponent, TasksComponent, CreateTaskDialogComponent, DeleteTaskDialogComponent],
    imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
