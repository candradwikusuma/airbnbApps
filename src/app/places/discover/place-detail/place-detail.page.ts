import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  NavController,
  ModalController,
  ActionSheetController,
} from "@ionic/angular";
import { Subscription } from "rxjs";

import { PlacesService } from "../../places.service";
import { Place } from "../../place.model";
import { CreateBookingComponent } from "../../../bookings/create-booking/create-booking.component";

@Component({
  selector: "app-place-detail",
  templateUrl: "./place-detail.page.html",
  styleUrls: ["./place-detail.page.scss"],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  private placesSub: Subscription;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/discover");
        return;
      }
      //this.place = this.placesService.getPlace(paramMap.get("placeId"));
      this.placesSub = this.placesService
        .getPlace(paramMap.get("placeId"))
        .subscribe((get) => {
          this.place = get;
        });
    });
  }
  onBookPlace() {
    this.actionSheetController
      .create({
        header: "Choose An Action",
        buttons: [
          {
            text: "Selected Date",
            handler: () => {
              this.openBookingModal("select");
            },
          },
          {
            text: "Random Date",
            handler: () => {
              this.openBookingModal("random");
            },
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ],
      })
      .then((actionSheetEL) => {
        actionSheetEL.present();
      });
    //this.navCtrl.navigateBack("/places/tabs/discover");
  }
  openBookingModal(mode: "select" | "random") {
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: {
          selectedPlace: this.place,
          selectedMode: mode,
        },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === "confirm") {
          console.log("Booked!");
        }
      });
  }
  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}