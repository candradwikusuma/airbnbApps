import { Injectable } from "@angular/core";
import { Place } from "./place.model";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      "p1",
      "Manhattan Mansion",
      "in the hearth of New York City",
      "https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg",
      149.99,
      new Date("2020-06-03"),
      new Date("2020-06-30")
    ),
    new Place(
      "p2",
      "L'Amour Toujours",
      "A romantic place in Paris",
      "https://i.pinimg.com/736x/6e/12/a3/6e12a3c9d28b00988370e1c646ad2d7a.jpg",
      189.99,
      new Date("2020-06-03"),
      new Date("2020-06-30")
    ),
    new Place(
      "p3",
      "The Foggy Palace",
      "Not your average city trip",
      "https://i1.trekearth.com/photos/138102/dsc_0681.jpg",
      99.99,
      new Date("2020-06-03"),
      new Date("2020-06-30")
    ),
  ];
  get place() {
    return [...this._places];
  }

  constructor() {}

  getPlace(id: string) {
    return { ...this._places.find((p) => p.id === id) };
  }
}
