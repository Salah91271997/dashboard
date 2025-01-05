import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
// import progess bar component
// import footer component
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './auth/components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { SignupComponent } from './auth/components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastModule,
    ProgressSpinnerModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class CoreModule {}
