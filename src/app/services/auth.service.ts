import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {BehaviorSubject, map, Observable, shareReplay, tap} from 'rxjs';
import {AppLoaderService} from './app-loader.service';

const AUTH_DATA = 'auth_data';

export class UserModel {
    id?: string;
    username: string;
    password: string;
}

export class AccessToken {
    accessToken: string;
}

export class ResetData {
    password: string;
    password_confirm: string;
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    BASE_URL = 'https://arcane-fjord-24138.herokuapp.com';
    // User state
    private subject = new BehaviorSubject<string>(null);
    accessToken$: Observable<string> = this.subject.asObservable();
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private http: HttpClient, private router: Router, private snackbar: MatSnackBar, private loader: AppLoaderService) {
        this.isLoggedIn$ = this.accessToken$.pipe(map((token) => !!token));
        this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

        const token = localStorage.getItem('id_token');
        if (token) {
            this.subject.next(token);
        }
    }

    // Register
    register(newUser: UserModel) {
        this.loader.open();
        this.http.post(`${this.BASE_URL}/auth/signup`, newUser).subscribe({
            next: (res: any) => {
                console.log(res);
                if (res) {
                    // Handle success notification
                    this.loader.close();
                    this.snackbar.open('Success', 'Registered successfully', {duration: 4000});
                    this.router.navigateByUrl('/');
                }
            },
            error: (error) => {
                // Handle error
                console.log(error.error.message);
                this.snackbar.open('Error', error.error.message, {duration: 4000});
            },
        });
    }

    // Login
    async login(user: UserModel) {
        this.loader.open();
        this.http
            .post<AccessToken>(`${this.BASE_URL}/auth/signin`, user)
            .pipe(
                tap((token: AccessToken) => {
                    this.subject.next(token.accessToken);
                    // localStorage.setItem(AUTH_DATA, JSON.stringify(token));
                    localStorage.setItem('id_token', token.accessToken);
                    // Navigate to login after token expiration
                    setTimeout(() => {
                        this.router.navigateByUrl('/');
                        localStorage.removeItem('id_token');
                    }, 1000 * 60 * 60);
                })
            )
            .subscribe({
                next: (res: AccessToken) => {
                    if (res) {
                        // Loader
                        this.loader.close();
                        // Handle success notification
                        this.snackbar.open('Success', 'Welcome back!', {duration: 4000});
                        // Route user
                        this.router.navigateByUrl('/dashboard/tasks');
                    }
                },
                error: (error) => {
                    // Handle error
                    console.log(error);
                    // Loader
                    this.loader.close();
                    // Handle success notification
                    this.snackbar.open('Oops', 'Something went wrong!', {duration: 4000});
                },
            });
    }

    // Send forgot password mail
    async forgotPassword(email: string) {
        // Loader
        this.loader.open();
        this.http.post<object>(`${this.BASE_URL}/reset-password`, email).subscribe({
            next: (res: any) => {
                if (res) {
                    // Loader
                    this.loader.close();
                    // Handle success notification
                    this.snackbar.open('Success', 'Please check your mail', {duration: 4000});
                    // Route user
                    this.router.navigateByUrl('/');
                }
            },
            error: (error) => {
                // Handle error
                console.log(error);
                // Loader
                this.loader.close();
                // Handle success notification
                this.snackbar.open('Oops', 'Something went wrong!', {duration: 4000});
            },
        });
    }

    // Reset password
    async resetPassword(resetData: ResetData) {
        // Loader
        this.loader.open();
        this.http.post<object>(`${this.BASE_URL}/reset`, resetData).subscribe({
            next: (res: any) => {
                if (res) {
                    // Handle success notification
                    this.snackbar.open('Success', 'Password updated', {duration: 4000});
                    // Route user
                    this.router.navigateByUrl('/');
                }
            },
            error: (error) => {
                // Handle error
                console.log(error);
                // Loader
                this.loader.close();
                // Handle error notification
                this.snackbar.open('Oops', error.error.message, {duration: 4000});
            },
        });
    }

    logout() {
        // Loader
        this.loader.open();
        localStorage.removeItem('id_token');
        this.subject.next(null);
        this.router.navigateByUrl('/');
        // Loader
        this.loader.close();
    }
}
