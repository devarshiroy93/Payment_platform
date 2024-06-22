import { Component, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ErrorMsgComponent } from '../../components/error-msg/error-msg.component';
import { Settings } from '../../components/input/input';
import { InputComponent } from '../../components/input/input.component';
import { LoginService } from './services/login-service.service';
import { Observable, Subscription, map, of, tap } from 'rxjs';
import { AlertComponent } from '../../components/alert/alert.component';
import { AlertSettings, DefaultAlertSettings } from '../../components/alert/alert';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


const IMPORTS = [InputComponent, ReactiveFormsModule, ErrorMsgComponent, AlertComponent, RouterModule, CommonModule]
@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss'
})
export class LoginContainerComponent implements OnDestroy {

  /**
  * Component instance pointing to login service
  */
  private loginService: LoginService = inject(LoginService);

  /**
  * Component instance of router
  */
  private router: Router = inject(Router);

  /**
   * Component reference to formBuilder
   */
  private fb: FormBuilder = inject(FormBuilder);

  /**
   * Login subscription variable
   */
  loginSubscription: Subscription | null = null

  alertSettings$: Observable<AlertSettings> = of(DefaultAlertSettings)
  /**
   * Component reference to FormGroup
   */
  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  /**
  * Component Variable for userNameFormFieldSettings
  */
  userNameFormFieldSettings: Settings = {
    label: 'Username',
    placeholder: 'Username',
    type: 'text',
    name: 'username',
  }

  /**
   * Component Variable for passwordFormFieldSettings
   */
  passwordFormFieldSettings: Settings = {
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
    name: 'password',
  }

  /**
   * Function returning the control details
   */
  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl
  }

  /**
  * Function returning the error details
  */
  getErrors(name: string): ValidationErrors | null | undefined {
    return this.form.get(name)?.errors
  }

  /**
   * Function handling form submit
   */
  onSubmit() {
    this.alertSettings$ = this.loginService.login(this.form.value).pipe(tap((res) => {
      if (res.isSuccess) {
        this.router.navigate(['dashboard']);
        localStorage.setItem('token', res.token || '');
      }
    }), map((data) => {
      return {
        show: !data.isSuccess,
        type: 'error',
        message: 'Login failed'
      };

    }));


  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }



}
