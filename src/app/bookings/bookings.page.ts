import { IonItemSliding, LoadingController } from "@ionic/angular";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Booking } from "./booking.model";
import { BookingService } from "./booking.service";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadingBookings: Booking[];
  private bookingSubs: Subscription;

  constructor(
    private bookingService: BookingService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.bookingSubs = this.bookingService.bookings.subscribe((bookings) => {
      this.loadingBookings = bookings;
    });
  }
  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl
      .create({
        message: "Canceling booking...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.bookingService.cancelBooking(bookingId).subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }
  ngOnDestroy() {
    if (this.bookingSubs) {
      this.bookingSubs.unsubscribe();
    }
  }
}
