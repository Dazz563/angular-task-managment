import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    isLogin = true;
    hidePassword = true;

    regForm: FormGroup;
    loginForm: FormGroup;

    constructor(private authService: AuthService, private snackbar: MatSnackBar) {}

    ngOnInit(): void {
        this.regForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
        });
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
        });
    }

    onChangeEntry() {
        this.isLogin = !this.isLogin;
    }

    onSubmitLogin() {
        this.authService.login(this.loginForm.value);
    }

    onSubmitRegister() {
        this.authService.register(this.regForm.value);
    }

    fgtPass() {}
}
