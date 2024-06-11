import { Component, OnInit, inject } from '@angular/core';
import { OnRampTransaction } from './transaction';
import { Observable, of } from 'rxjs';
import { TransactionService } from './services/transaction.service';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../../components/chip/chip.component';

@Component({
  selector: 'app-transactions-container',
  standalone: true,
  imports: [CommonModule , ChipComponent],
  templateUrl: './transactions-container.component.html',
  styleUrl: './transactions-container.component.scss'
})
export class TransactionsContainerComponent implements OnInit{

  transactionService: TransactionService = inject(TransactionService);

  onRampTransactions$: Observable<OnRampTransaction[]> = of([]);


  ngOnInit(): void {
    this.onRampTransactions$ = this.transactionService.getonRampTransactions()
  }


}
