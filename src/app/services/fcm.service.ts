import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { FCM } from "@ionic-native/fcm/ngx";

@Injectable({
  providedIn: "root"
})
export class FcmService {
  constructor(private platform: Platform, private fcm: FCM) {}

  async onNotification() {
    try {
      await this.platform.ready();
      this.fcm.subscribeToTopic("marketing");

      this.fcm.getToken().then(token => {
        console.log("token:", token);
      });

      this.fcm.onNotification().subscribe(data => {
        console.log(data);
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });

      this.fcm.unsubscribeFromTopic("marketing");
    } catch (err) {
      console.error(err);
    }
  }
}
