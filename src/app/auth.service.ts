import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Address, iAddress } from './admin/admin.model';
import { Contact, iContact } from './emergency/emergency.model';
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  updateDoc,
  query,
  where,
  doc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  newAddressList: iAddress[] = [];
  addresses: Address = new Address();
  newContactList: iContact[] = [];
  contacts: Contact = new Contact();
  currentUser: User | null = null;
  private carType = new BehaviorSubject<string[]>([]);
  currentCarType = this.carType.asObservable();

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    const firebaseConfig = environment.firebaseConfig;
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
    });
  }

  getUser(): User | null {
    const auth = getAuth();
    return auth.currentUser;
  }

  async getUserType(email: string): Promise<string> {
    const db = getFirestore();
    const userRef = collection(db, 'users');
    const q = query(userRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return userData['userType'];
    } else {
      throw new Error('User not found');
    }
  }

  setAuthentication(auth: boolean) {
    if (auth) {
      localStorage.setItem('loggedIn', 'true');
    }
  }

  canActivate() {
    if (localStorage.getItem('loggedIn') == 'true') {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  async signUp(
    email: string,
    password: string,
    retypePassword: string,
    userType: string,
    phNo: string,
    carType: string,
    username: string
  ) {
    if (!email || !password || !retypePassword) {
      this.presentAlert('Sorry', 'Please fill in all fields.');
      return;
    }

    if (password !== retypePassword) {
      this.presentAlert('Try again', 'Passwords do not match');
      return;
    }

    if (password.length <= 6) {
      this.presentToast('Password must be 6 or more characters');
      return;
    }

    if (phNo.length != 11) {
      this.presentToast('Phone Number consist of 11 digits only');
      return;
    }

    const auth = getAuth();

    try {
      const phoneQuerySnapshot = await getDocs(
        query(collection(getFirestore(), 'users'), where('phNo', '==', phNo))
      );
      if (!phoneQuerySnapshot.empty) {
        this.presentAlert('Sorry', 'Phone Number is already in use');
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const firestore = getFirestore();

      if (userType == 'driver') {
        await addDoc(collection(firestore, 'users'), {
          uid: user.uid,
          email,
          username,
          userType,
          phNo,
          carType,
          available: true,
        });
      } else {
        await addDoc(collection(firestore, 'users'), {
          uid: user.uid,
          email,
          username,
          userType,
          phNo,
        });
      }

      this.presentAlert('Success', 'Sign up successful');
      this.router.navigate(['/login']);
    } catch (error) {}
  }

  async login(email: string, password: string) {
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (email === 'onlyadmin@email.com' && password === 'adminOnly') {
        // Admin account
        console.log('Admin login attempt');
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        this.setAuthentication(true);
        this.presentAlert('Success', 'Admin sign in successful');
        this.router.navigate(['/admin']);
      } else {
        // Fetch user type
        const userType = await this.getUserType(email);
        console.log(`User type fetched: ${userType}`);

        if (userType === 'driver') {
          // Driver account
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          this.setAuthentication(true);
          this.presentAlert('Success', 'Driver sign in successful');
          this.router.navigate(['/drivers']);
        } else {
          // Regular user account
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          this.setAuthentication(true);
          this.presentAlert('Success', 'Sign in successful');
          this.router.navigate(['tabs/dashboard']);
        }
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.presentAlert('Login Failed', errorMessage);
      console.error('Error during login:', error);
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duration in milliseconds, adjust as needed
      position: 'bottom', // Position of the toast message on the screen
    });
    toast.present();
  }

  async logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('loggedIn');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getAddress(): Promise<iAddress[]> {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    const users: Address[] = [];
    const querySnapshot = await getDocs(collection(firestore, 'addresses'));
    querySnapshot.forEach((doc) => {
      const user = doc.data() as Address;
      user.id = doc.id;
      users.push(user);
    });
    return users;
  }

  async tryAdd(address: Address) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRefM1 = await addDoc(collection(firestore, 'address'), {
        title: address.title,
        place: address.place,
      });
      console.log('Document written with ID: ', docRefM1.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async tryUpdate(address: Address) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRef = doc(firestore, 'address', address.id);
      await updateDoc(docRef, { title: address.title, place: address.place });
    } catch (e) {
      console.error('Error update document: ', e);
    }
  }

  async tryDelete(address: Address) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRef = doc(firestore, 'address', address.id);
      await deleteDoc(docRef);
    } catch (e) {
      console.error('Delete error: ', e);
    }
  }

  changeCarType(type: string[]) {
    this.carType.next(type);
  }

  //contact-firebase

  async getContact(): Promise<iContact[]> {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    const contacts: Contact[] = [];
    const querySnapshot = await getDocs(collection(firestore, 'contacts'));
    querySnapshot.forEach((doc) => {
      const contact = doc.data() as Contact;
      contact.id = doc.id;
      contacts.push(contact);
    });
    return contacts;
  }

  async tryAddContact(contact: Contact) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const contacts = await this.getContact();

      if (contacts.length >= 3) {
        console.error('You can only have 3 emergency contacts.');
        this.presentToast('You can only have 3 emergency contacts.');
        return;
      }

      const user = this.getContact();
      if (!user) {
        throw new Error('No user is currently logged in.');
      }
      const userId = contact.id;

      const docRefM1 = await addDoc(collection(firestore, 'contacts'), {
        userId: userId,
        name: contact.name,
        contactNum: contact.contactNum,
      });
      console.log('Document written with ID: ', docRefM1.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async tryUpdateContact(contact: Contact) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRef = doc(firestore, 'contacts', contact.id);
      await updateDoc(docRef, {
        name: contact.name,
        contactNum: contact.contactNum,
      });
    } catch (e) {
      console.error('Error update document: ', e);
    }
  }

  async tryDeleteContact(contact: Contact) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRef = doc(firestore, 'contacts', contact.id);
      await deleteDoc(docRef);
    } catch (e) {
      console.error('Delete error: ', e);
    }
  }
}
