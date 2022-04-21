import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AuthRoutingModule} from './auth.routing';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent],
    imports: [CommonModule, SharedModule, AuthRoutingModule],
    exports: [AuthRoutingModule],
})
export class AuthModule {}
