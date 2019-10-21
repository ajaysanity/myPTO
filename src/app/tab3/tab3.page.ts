import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private afAuth: AngularFireAuth,
    private nav: NavController
  ) {}

  signout(){
    this.afAuth.auth.signOut().then( res => {
      this.nav.navigateRoot('login')
    })
  }
}
