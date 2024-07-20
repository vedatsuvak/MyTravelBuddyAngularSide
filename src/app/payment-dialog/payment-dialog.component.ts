import {booleanAttribute, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {SessionService} from "../session-service.service";


@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit{
  @Output() paymentSuccess: EventEmitter<any> = new EventEmitter<any>();
  paymentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    private toastr: ToastrService,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['1234567890123456', Validators.required],
      expireDate: ['01/01/2000', Validators.required],
      cvvCode: ['123', Validators.required]
    });
  }

  ngOnInit(): void {
    this.checkAuthorization();
  }

  checkAuthorization(): void {
    const loggedInUser = this.sessionService.getSession();
    if (!loggedInUser) {
      this.router.navigate(['/login']);
      this.toastr.error('You are not authorized to access this page.', 'Unauthorized');
    }
  }

  submitPayment(): void {
    const expectedCardNumber = '1234567890123456';
    const expectedExpireDate = '01/01/2000';
    const expectedCVVCode = '123';

    const enteredCardNumber = this.paymentForm.value.cardNumber;
    const enteredExpireDate = this.paymentForm.value.expireDate;
    const enteredCVVCode = this.paymentForm.value.cvvCode;

    if (
      this.paymentForm.valid &&
      enteredCardNumber === expectedCardNumber &&
      enteredExpireDate === expectedExpireDate &&
      enteredCVVCode === expectedCVVCode
    ) {
      this.toastr.success('Transaction is successful, Thank you!');
      this.dialogRef.close({ success: true });
    } else {
      let errorMessage = 'Sorry, payment failed. Please try again!';
      if (enteredCardNumber !== expectedCardNumber) {
        errorMessage = 'Invalid card number. Please enter the correct card number.';
      } else if (enteredExpireDate !== expectedExpireDate) {
        errorMessage = 'Invalid expiration date. Please enter the correct expiration date.';
      } else if (enteredCVVCode !== expectedCVVCode) {
        errorMessage = 'Invalid CVV code. Please enter the correct CVV code.';
      }
      this.toastr.error(errorMessage, 'Error');
      this.dialogRef.close({ success: false });
    }
  }
}
