import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
    constructor(private authService: AuthService, private route: ActivatedRoute) {}
    passwordMatch = false;
    token: string;

    form: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
            password_confirm: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
        });
    }

    onSubmitPasswordChange() {
        this.token = this.route.snapshot.params['token'];

        let data = {
            password: this.form.value.password,
            password_confirm: this.form.value.password_confirm,
            token: this.token,
        };
        this.authService.resetPassword(data);
    }
}
