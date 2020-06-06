import { Component, OnInit, OnDestroy } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { SegmentChangeEventDetail } from "@ionic/core";

import { PlacesService } from "../places.service";
import { Place } from "../place.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  private placesSubs: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    // this.loadedPlaces = this.placesService.place;
    // this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    this.placesSubs = this.placesService.place.subscribe((places) => {
      this.loadedPlaces = places;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
  }
  onOpenMenu() {
    this.menuCtrl.toggle();
  }
  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }
  ngOnDestroy() {
    if (this.placesSubs) {
      this.placesSubs.unsubscribe();
    }
  }
}
