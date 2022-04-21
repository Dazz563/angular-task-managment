import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule, MatSnackBarModule, MatProgressSpinnerModule, MatSelectModule, MatDialogModule],
    exports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatMenuModule, MatSnackBarModule, MatProgressSpinnerModule, MatSelectModule, MatDialogModule],
})
export class MaterialModule {}
