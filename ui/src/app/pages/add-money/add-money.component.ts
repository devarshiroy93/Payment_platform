import { Component, OnInit, inject } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Settings } from '../../components/input/input';

@Component({
  selector: 'app-add-money',
  standalone: true,
  imports: [InputComponent , ReactiveFormsModule],
  templateUrl: './add-money.component.html',
  styleUrl: './add-money.component.scss'
})
export class AddMoneyComponent implements OnInit{

  private fb: FormBuilder = inject(FormBuilder);

 
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

  handleSubmit(){
    console.log(this.form.value);
  }

  ngOnInit(): void {
    this.form?.get('bank')?.setValue('sbi');
    this.form?.get('amount')?.setValue(100);
  }
}
