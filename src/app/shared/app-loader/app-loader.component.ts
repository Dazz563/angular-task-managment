import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AppLoaderService} from 'src/app/services/app-loader.service';

@Component({
    selector: 'app-app-loader',
    templateUrl: './app-loader.component.html',
    styleUrls: ['./app-loader.component.scss'],
})
export class AppLoaderComponent implements OnInit {
    title: string;
    message: string;
    constructor(public dialogRef: MatDialogRef<AppLoaderComponent>, public loader: AppLoaderService) {}

    ngOnInit(): void {}
}
