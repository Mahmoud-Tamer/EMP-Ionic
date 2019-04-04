import { Component } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  contentSliderOptions = {
    speed: 300,
    loop: true,
    autoplay: {
      delay: 5000
    }
  };

  constructor(private popoverCtrl: PopoverController) {}

  async addFinePopover() {
    const popover = await this.popoverCtrl.create({
      component: "",
      translucent: true,
      animated: false
    });
    return await popover.present();
  }
}
