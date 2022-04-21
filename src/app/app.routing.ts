import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanLoadAuthGuard} from './services/can-load-auth.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canLoad: [CanLoadAuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [CanLoadAuthGuard],
})
export class AppRoutingModule {}
