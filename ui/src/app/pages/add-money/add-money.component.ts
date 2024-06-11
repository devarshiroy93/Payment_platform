import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Settings } from '../../components/input/input';
import { AddMoneyService } from './services/add-money.service';
import { HomeUiService } from '../home-container/services/home-ui.service';
import { StartOnRampTxnResponse } from './add-money';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-add-money',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './add-money.component.html',
  styleUrl: './add-money.component.scss'
})
export class AddMoneyComponent implements OnInit , OnDestroy {

  /**
   * Component reference for form builder
   */
  private fb: FormBuilder = inject(FormBuilder);

  /**
   * Component reference for add money service
   */
  private addMoneyService: AddMoneyService = inject(AddMoneyService);

  /**
   * Component reference for home Ui Service
   */
  private homeUiService: HomeUiService = inject(HomeUiService);

  /**
   * Observable stream ultimately resolving to start transaction response
   */
  private addMoneyRes$: Observable<StartOnRampTxnResponse | null> = of(null);

  /**
  * Component reference to subscription
  */
  addMoneySubscription: Subscription | null = null;

  /**
   * Component reference to FormGroup
   */
  form: FormGroup = this.fb.group({
    bank: ['', [Validators.required]],
    amount: ['', [Validators.required]]
  });

  /**
  * Function returning the control details
  */
  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl
  }

  /**
   * Form field settings for amount 
   */
  amountFormFieldSettings: Settings = {
    label: 'Amount (in Rs.) ',
    placeholder: 'Amount',
    type: 'number',
    name: 'amount',
  }

  /**
   * component function to handle the add money form submit action
   */
  handleSubmit() {
    this.addMoneyRes$ = this.addMoneyService.startAddMoneyTransaction(
      {
        amount: Number(this.form.value.amount),
        provider: this.form.value.bank
      });

    //test code
    this.addMoneySubscription = this.addMoneyRes$.subscribe((data: StartOnRampTxnResponse | null) => {
      console.log(data);
      this.homeUiService.updateHomeUiAlert({
        message: data?.message || '',
        show: true,
        type: data?.isSuccess ? 'success' : 'error'
      })
    })
  }

  ngOnInit(): void {
    this.form?.get('bank')?.setValue('sbi');
    this.form?.get('amount')?.setValue(100);
  }
  ngOnDestroy(): void {
    this.addMoneySubscription?.unsubscribe();
  }
}
