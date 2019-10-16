import { LoadingController, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public loading: LoadingController, public alert: AlertController) { }

  //Ajay: success loading
  async SuccessLoading(message: any){
    const loading = await this.loading.create({
      message: message
    })
    return await loading.present();
  }
  //Ajay: dismiss loading
   async DismissLoading(){
      return await this.loading.dismiss(null,undefined);
  }
  //Ajay: failed alert 
  async FailedAlert(title: any,message: any){
    const alert = await this.alert.create({
      header: title,
      message: message,
      buttons: ['Dismiss']
    });
      return await alert.present();
  }

}
