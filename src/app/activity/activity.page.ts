import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  bookings: any[] = [];
  currentUserUid: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    const userData = localStorage.getItem(
      'firebase:authUser:AIzaSyBUfWYnUikWBtCDy0qhONZqCBRmXbeHk5Q:[DEFAULT]'
    );
    if (userData) {
      const user = JSON.parse(userData);
      this.currentUserUid = user.uid;
      this.fetchBookings();
    } else {
      console.error('No user is logged in');
    }
  }

  async fetchBookings() {
    if (this.currentUserUid) {
      const db = getFirestore();
      const bookingsRef = collection(db, 'books');
      const q = query(bookingsRef, where('uid', '==', this.currentUserUid));
      try {
        const querySnapshot = await getDocs(q);
        this.bookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Bookings fetched for user UID:', this.currentUserUid);
        console.log('Bookings:', this.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }
  }

  bookInfo(booking: any) {
    this.router.navigate(['book-info', booking.id]);
  }
}
