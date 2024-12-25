import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {
  users: any[] = [];

  constructor(private authService: AuthService, private router: Router, private loadController: LoadingController) { }


  ngOnInit() {
    this.fetchUsers();
  }

  async fetchUsers() {
    const app = initializeApp(environment.firebaseConfig);
    const db = getFirestore(app);

    try {
      const q = query(collection(db, 'users'), where('userType', '==', 'passenger'));
      const querySnapshot = await getDocs(q);
      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        passName: doc.data()['passName'],
        username: doc.data()['username'],
        phNo: doc.data()['phNo'],
        email: doc.data()['email'],
      }));
      this.users = fetchedUsers;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }


}
