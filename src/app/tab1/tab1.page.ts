import { MypiService } from './../api/mypi.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Approval,User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  userId: any;
  approval: Observable<any>;
  approvalCollection: AngularFirestoreCollection<Approval>
  getUser: Observable<User[]>;
  getUserDoc: AngularFirestoreCollection<User>
  data: [];
  constructor(private myapi: MypiService, public afDb: AngularFirestore) {

  }
  slideOptions={
    initialSlide:0,
    slidesPerView: 1.2,
  
  }
ngOnInit(){
  this.myapi.getId().then(async (res:any) => {
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


}
