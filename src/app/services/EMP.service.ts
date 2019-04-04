import { Injectable } from "@angular/core";
import { ToastController, LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class EMPService {
  loader: any;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async presentLoading() {
    this.loader = await this.loadingCtrl.create({
      spinner: "crescent",
      message: "please wait"
    });
    this.loader.present();
  }

  hideLoader() {
    this.loader.dismiss();
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
