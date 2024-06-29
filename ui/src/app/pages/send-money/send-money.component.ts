import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription, of, tap } from 'rxjs';
import { Settings } from '../../components/input/input';
import { InputComponent } from '../../components/input/input.component';
import { HomeUiService } from '../home-container/services/home-ui.service';
import { Contact, SendMoneyResponse } from './send-money';
import { SendMoneyService } from './services/send-money.service';
import { HomeService } from '../home-container/services/home.service';

@Component({
  selector: 'app-send-money',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, CommonModule],
  templateUrl: './send-money.component.html',
  styleUrl: './send-money.component.scss'
})
export class SendMoneyComponent implements OnInit, OnDestroy {


  /**
   * Component reference for form builder
   */
  private fb: FormBuilder = inject(FormBuilder);

  /**
   * Component reference for form builder
   */
  private sendMoneyService: SendMoneyService = inject(SendMoneyService);

  /**
   * Component reference for home Ui Service
   */
  private homeUiService: HomeUiService = inject(HomeUiService);

  /**
  * Component reference for home  Service
  */
  private homeService: HomeService = inject(HomeService);

  /**
   * Observable stream ultimately resolving to contact list
   */
  contactList$: Observable<Contact[]> = of([]);

  /**
  * Observable stream ultimately resolving to start transaction response
  */
  private sendMoneyRes$: Observable<SendMoneyResponse | null> = of(null);

  /**
   * Subsription for send money response observable
   */
  private sendMoneySubscription: Subscription | null = null;

  /**
   * Component reference to FormGroup
   */
  form: FormGroup = this.fb.group({
    contactId: ['', [Validators.required]],
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

  handleSubmit() {
    console.log(this.form.value);
    this.sendMoneyRes$ = this.sendMoneyService.sendMoney({
      userId: this.form.value.contactId,
      amount: this.form.value.amount
    })

    this.sendMoneySubscription = this.sendMoneyRes$.subscribe((data) => {

      this.homeService.updateBalance();
      this.homeUiService.updateHomeUiAlert({
        message: data?.message || '',
        show: true,
        type: data?.isSuccess ? 'success' : 'error'
      });
    })
  }

  ngOnInit(): void {
    this.contactList$ = this.sendMoneyService.getContactList();
  }

  ngOnDestroy(): void {
    if (this.sendMoneySubscription) {
      this.sendMoneySubscription.unsubscribe();
    }
  }
}
