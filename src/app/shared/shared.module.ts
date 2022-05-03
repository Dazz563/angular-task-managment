import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';
import {AppLoaderComponent} from './app-loader/app-loader.component';

@NgModule({
    imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, HttpClientModule],
    exports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, HttpClientModule],
    declarations: [AppLoaderComponent],
})
export class SharedModule {}
