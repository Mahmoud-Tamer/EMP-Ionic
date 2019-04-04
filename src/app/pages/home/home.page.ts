import { Component } from "@angular/core";

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

  constructor() {}
}
