import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ErrorMsgComponent } from '../../components/error-msg/error-msg.component';
import { Settings } from '../../components/input/input';
import { InputComponent } from '../../components/input/input.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { RegisterService } from './services/register.service';
import { RegisterApiFormattedUiResponse, RegisterApiResponse } from './register-container';
import { Observable, map, of } from 'rxjs';
import { AlertSettings, DefaultAlertSettings } from '../../components/alert/alert';
import { CommonModule } from '@angular/common';


const IMPORTS = [InputComponent, ReactiveFormsModule, CommonModule, ErrorMsgComponent, AlertComponent]

@Component({
  selector: 'app-register-container',
  standalone: true,
  imports: [...IMPORTS],
  templateUrl: './register-container.component.html',
  styleUrl: './register-container.component.scss'
})
export class RegisterContainerComponent {

  /**
   * Component reference to register service
   */
  private registerService: RegisterService = inject(RegisterService);


  /**
   * Component reference to formBuilder
   */
  private fb: FormBuilder = inject(FormBuilder);

  /**
   * Component reference to FormGroup
   */
  form: FormGroup = this.fb.group({

    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]]
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
   * Component Variable for passwordFormFieldSettings
   */
  firstNameFormFieldSettings: Settings = {
    label: 'First name',
    placeholder: 'First name',
    type: 'text',
    name: 'firstName',
  }

  /**
   * Component Variable for passwordFormFieldSettings
   */
  lastNAmeFormFieldSettings: Settings = {
    label: 'Last name',
    placeholder: 'Last name',
    type: 'text',
    name: 'lastName',
  }

  registerApiResponse$: Observable<RegisterApiFormattedUiResponse> | null = null;
  alertSettings$: Observable<AlertSettings> = of(DefaultAlertSettings)

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
    console.log(this.form.value);
    this.registerApiResponse$ = this.registerService.register(this.form.value);
    this.alertSettings$ = this.registerApiResponse$.pipe(map((data) => {
      return {
        show: true,
        type: data.isSuccess ? 'success' : 'error',
        message : data.message
      }
    }))
  }
}
