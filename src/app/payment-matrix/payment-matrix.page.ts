import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-matrix',
  templateUrl: './payment-matrix.page.html',
  styleUrls: ['./payment-matrix.page.scss'],
})
export class PaymentMatrixPage implements OnInit {
  selectedPaymentMethod: string = '';
  accountName: string = '';
  accountPhoneNumber: string = '';
  currentUserUid: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadPaymentInformation();
  }

  async loadPaymentInformation() {
    const user = this.authService.getUser();
    if (user) {
      this.currentUserUid = user.uid;

      const firestore = getFirestore();
      const docRef = doc(firestore, 'paymentMethods', this.currentUserUid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const paymentData = docSnap.data();
        this.selectedPaymentMethod = paymentData['paymentMethod'];
        if (this.selectedPaymentMethod === 'GCash') {
          this.accountName = paymentData['accountName'];
          this.accountPhoneNumber = paymentData['accountPhoneNumber'];
        }
      }
    }
  }

  async savePaymentMethod() {
    try {
      const user = this.authService.getUser();
      if (user) {
        const uid = user.uid;

        const firestore = getFirestore();
        const paymentData = {
          paymentMethod: this.selectedPaymentMethod,
          ...(this.selectedPaymentMethod === 'GCash' && {
            accountName: this.accountName,
            accountPhoneNumber: this.accountPhoneNumber
          }),
          uid: uid
        };

        const docRef = doc(firestore, 'paymentMethods', uid);
        await setDoc(docRef, paymentData);
        console.log('Payment method saved successfully!');
        this.router.navigate(['tabs/user-account'])
      } else {
        console.error('No user is logged in.');
      }
    } catch (error) {
      console.error('Error saving payment method: ', error);
    }
  }

}
