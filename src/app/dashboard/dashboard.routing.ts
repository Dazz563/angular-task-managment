import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlanningTasksComponent} from '../planning-tasks/planning-tasks.component';
import {DashboardComponent} from './dashboard.component';
import {TasksComponent} from './tasks/tasks.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'tasks',
                component: TasksComponent,
            },
            {
                path: 'planning-tasks',
                component: PlanningTasksComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class DashboardRoutingModule {}
