import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, HttpClientModule],
    exports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, HttpClientModule],
})
export class SharedModule {}
