import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class MypiService {

  constructor(  private afAuth: AngularFireAuth,
    ) { }

  getId(){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.onAuthStateChanged(async (user) => {
        try{
          const myid = user.uid;
          resolve({uid: myid})
        }catch(err){
          reject("Failed getting user")
        }
      })
    });
  }
}
