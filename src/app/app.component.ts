import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { EMPService } from "./services/EMP.service";
import { FcmService } from "./services/fcm.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "Employees",
      url: "/employees",
      icon: "people"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private embService: EMPService,
    private fcmService: FcmService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#7f8c8d");
      this.splashScreen.hide();

      this.platform.resume.subscribe(() => {
        this.embService.presentToast("Welcome Back");
      });
    });
  }

  ngOnInit() {
    this.fcmService.onNotification();
  }
}
