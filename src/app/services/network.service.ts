import { Injectable } from "@angular/core";
import { EMPService } from "./EMP.service";
import { Platform } from "@ionic/angular";
import { Network } from "@ionic-native/network/ngx";
import { BehaviorSubject, Observable } from "rxjs";

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: "root"
})
export class NetworkService {
  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(
    ConnectionStatus.Offline
  );

  constructor(
    private network: Network,
    private empService: EMPService,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.initializeNetworkEvents();
      let status =
        this.network.type !== "none"
          ? ConnectionStatus.Online
          : ConnectionStatus.Offline;
      this.status.next(status);
    });
  }

  public initializeNetworkEvents() {
    this.network.onDisconnect().subscribe(() => {
      console.log("status");
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log("WE ARE OFFLINE");
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });

    this.network.onConnect().subscribe(() => {
      console.log("status");
      if (this.status.getValue() === ConnectionStatus.Offline) {
        console.log("WE ARE ONLINE");
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    });
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);

    let connection = status == ConnectionStatus.Offline ? "Offline" : "Online";
    this.empService.presentToast(`You are now ${connection}`);
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }
}
