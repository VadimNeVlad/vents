import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';
import { InputComponent } from './components/input/input.component';
import { InputRadioComponent } from './components/input-radio/input-radio.component';
import { AvatarIconComponent } from './components/avatar-icon/avatar-icon.component';
import { AvatarColorDirective } from './directives/avatar-color.directive';
import { AuthUserItemComponent } from './components/auth-user-item/auth-user-item.component';
import { SelectComponent } from './components/select/select.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { TextareaComponent } from './components/textarea/textarea.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    LoaderComponent,
    ModalComponent,
    InputComponent,
    InputRadioComponent,
    AvatarIconComponent,
    AvatarColorDirective,
    AuthUserItemComponent,
    SelectComponent,
    DatePickerComponent,
    TextareaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    MatIconModule,
    LoaderComponent,
    ModalComponent,
    InputComponent,
    InputRadioComponent,
    AvatarIconComponent,
    AvatarColorDirective,
    AuthUserItemComponent,
    MatMenuModule,
    SelectComponent,
    DatePickerComponent,
    TextareaComponent,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-En' }],
})
export class SharedModule {}
