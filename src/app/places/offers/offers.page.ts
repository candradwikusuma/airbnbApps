import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { PlacesService } from "../places.service";
import { Place } from "../place.model";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.page.html",
  styleUrls: ["./offers.page.scss"],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  private placesSubs: Subscription;

  constructor(private placesService: PlacesService) {}

  ngOnInit() {
    // this.offers = this.placesService.place;
    this.placesSubs = this.placesService.place.subscribe((places) => {
      this.offers = places;
    });
  }
  onEdit(offerId: string) {
    console.log("Editing Item", offerId);
  }
  ngOnDestroy() {
    if (this.placesSubs) {
      this.placesSubs.unsubscribe();
    }
  }
}
