import { Component, OnInit } from '@angular/core';
import { authInfo } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertService } from './../api/alert.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authData: authInfo;

  constructor(public myalert: AlertService,
    private nav: NavController,
    public afAuth: AngularFireAuth, public afDb: AngularFirestore
    ) { }

  ngOnInit() {
  }

 async signin(form: NgForm) {
    let formValue = form.value
    let email = formValue.email
    let password = formValue.password
    let credentails = {
      email: email,
      password: password
    }
    //Ajay: check if fields are null or not
    if (email != null && password != null) {
      this.myalert.SuccessLoading("Logging In Please Wait....");
      await this.afAuth.auth.signInWithEmailAndPassword(email,password).then(result => {
          //Ajay: getting claims if owner or not
            //Ajay: statement to check if owner is true
              this.myalert.DismissLoading();
                this.myalert.DismissLoading();
                this.nav.navigateRoot('tabs');
        }).catch(err => {
          this.myalert.DismissLoading();
          let errCode = err.code
          // Ajay: error handler for input credentials
          switch (errCode) {
            case "auth/wrong-password": {
              this.myalert.FailedAlert('Failed', 'Incorrect Password')
              break;
            }
            case "auth/invalid-email": {
              this.myalert.FailedAlert('Failed', 'Invalid Email')
              break;
            }
            case "auth/user-disabled": {
              this.myalert.FailedAlert('Failed', 'Account Disabled')
              break;
            }
            case "auth/user-not-found": {
              this.myalert.FailedAlert('Failed', 'User not found')
              break;
            }
            default: {
              this.myalert.FailedAlert('Failed', 'Something Went Wrong')
              break;
            }
          }
        });

    } else {
      //Ajay: null forms
      this.myalert.FailedAlert('Failed', 'Please Complete all the Fields')

    }
  }

}
