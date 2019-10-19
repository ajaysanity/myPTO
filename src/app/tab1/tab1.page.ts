import { MypiService } from './../api/mypi.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Approval,User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  userId: any;
  approval: Observable<any>;
  approvalCollection: AngularFirestoreCollection<Approval>
  getUser: Observable<any>;
  getUserDoc: AngularFirestoreDocument<User>
  data: [];
  profileName: any;
  profileImg: any;
  profileLastname: any;
  role:any;
  constructor(private myapi: MypiService, public afDb: AngularFirestore, private router: Router,
    ) {

  }
  slideOptions={
    initialSlide:0,
    slidesPerView: 1.2,
  
  }
ngOnInit(){
  this.getUserDoc

  this.myapi.getId().then(async (res:any) => {
    this.getUserDetails(res.uid)
    this.userId = res.uid


    this.approvalCollection = this.afDb.collection<Approval>(`User/${this.userId}/Approval`)
    this.approval = this.approvalCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const docData = a.payload.doc.data() as Approval;
         let docId = a.payload.doc.id;
        return {docId, ...docData}
      }))
    ) 
  });
}

getUserDetails(uid: any){
  this.userId = uid
  this.getUserDoc = this.afDb.doc(`User/${this.userId}`)
this.getUserDoc.valueChanges().subscribe( data =>{
console.log(data)
this.profileName = data.name
this.profileImg = data.img
this.profileLastname = data.lastname
this.role = data.role
});
}

leaveType(type: any){
  console.log(type)
  let navigationExtras: NavigationExtras = {
    state: {
      type: type
    }
  }
  this.router.navigate(['calendar'], navigationExtras)
}
}
