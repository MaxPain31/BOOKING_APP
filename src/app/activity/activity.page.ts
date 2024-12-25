import { Component, OnInit } from '@angular/core';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage {
  bookings: any[] = [];

  constructor() {}

  async ngOnInit() {}
}
