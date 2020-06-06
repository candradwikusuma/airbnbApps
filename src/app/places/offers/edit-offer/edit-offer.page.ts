import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NavController, LoadingController } from "@ionic/angular";

import { PlacesService } from "../../places.service";
import { Place } from "../../place.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"],
})
export class EditOfferPage implements OnInit, OnDestroy {
  form: FormGroup;
  place: Place;
  private placeSubs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/offers");
        return;
      }
      // this.place = this.placesService.getPlace(paramMap.get("placeId"));
      this.placeSubs = this.placesService
        .getPlace(paramMap.get("placeId"))
        .subscribe((get) => {
          this.place = get;
        });
    });

    this.form = new FormGroup({
      title: new FormControl(this.place.title, {
        updateOn: "blur",
        validators: [Validators.required],
      }),
      description: new FormControl(this.place.description, {
        updateOn: "blur",
        validators: [Validators.required, Validators.maxLength(100)],
      }),
    });
  }
  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl
      .create({
        message: "Updating place...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.placesService
          .updatePlace(
            this.place.id,
            this.form.value.title,
            this.form.value.description
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(["/places/tabs/offers"]);
          });
      });
  }
  ngOnDestroy() {
    if (this.placeSubs) {
      this.placeSubs.unsubscribe();
    }
  }
}
