import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.page.html',
  styleUrls: ['./book-info.page.scss'],
})
export class BookInfoPage implements OnInit {
  bookingId: string = '';
  bookingData: any = null; // Updated to hold the booking data

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve the 'id' from route parameters
    this.bookingId = this.route.snapshot.paramMap.get('id');
    if (this.bookingId) {
      this.fetchBookingData();
    }
  }

  async fetchBookingData() {
    const db = getFirestore();
    const bookingRef = doc(db, 'books', this.bookingId);

    try {
      const bookingSnapshot = await getDoc(bookingRef);
      if (bookingSnapshot.exists()) {
        this.bookingData = bookingSnapshot.data();
        console.log(this.bookingData);
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error fetching booking:', error);
    }
  }
}
