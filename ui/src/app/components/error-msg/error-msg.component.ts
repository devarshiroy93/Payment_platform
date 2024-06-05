import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ControlContainer, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { DefaultErrorMessageConfig, DefaultFormState, ErrorMessage, FormState } from './error-msg';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-msg',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.scss',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true })
  }]
})
export class ErrorMsgComponent implements OnInit, OnDestroy {

  /**
  * control name to get the form control from parent group
  */
  @Input()
  controlName: string = ''

  /**
   * Validation error message config
   */
  @Input()
  errMsgsConfig: ErrorMessage = DefaultErrorMessageConfig;

  /**
   * Form group reference from parent form
   */
  parentContainer: ControlContainer = inject(ControlContainer);

  /**
   * Component variable for storing form state
   */
  formState: FormState = DefaultFormState;

  /**
   * Component variable for storing errors
   */
  errors: ValidationErrors | undefined | null = null;

  /**
   * Component reference to subscription for noticing value changes
   */
  valueChangeSubscription: Subscription | undefined;

  /**
   * ngOninit 
   * Initialises the component
   */
  ngOnInit() {
    this.listentoValueChanges();
  }

  /**
   * listentoValueChanges 
   * listens to value changes on form control
   */
  listentoValueChanges() {
    const formGroup = (this.parentContainer.control as FormGroup);
    this.valueChangeSubscription = formGroup.get(this.controlName)?.valueChanges.subscribe((value) => {
      this.assignFormState();
      this.assignErrors()
    })
  }


  /**
   * assignFormState 
   * Assigns the correct form state 
   */
  assignFormState() {
    const formGroup = (this.parentContainer.control as FormGroup);
    this.formState = {
      valid: formGroup?.get(this.controlName)?.valid || false,
      dirty: formGroup?.get(this.controlName)?.dirty || false,
      touched: formGroup?.get(this.controlName)?.touched || false
    }
  }

  /**
  * assignErrors 
  * Assigns the errors for UI display
  */
  assignErrors() {
    const formGroup = (this.parentContainer.control as FormGroup);
    this.errors = formGroup?.get(this.controlName)?.errors;
  }

  /**
   * ngOnDestroy 
   * Cleanup before destroying component
   */
  ngOnDestroy(): void {
    if (this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe()
    }
  }
}
