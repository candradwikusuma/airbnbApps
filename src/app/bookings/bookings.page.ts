import { IonItemSliding } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

import { Booking } from "./booking.model";
import { BookingService } from "./booking.service";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"],
})
export class BookingsPage implements OnInit {
  loadingBookings: Booking[];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadingBookings = this.bookingService.bookings;
  }
  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    //cancel bookingwith id offerid
  }
}
