import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DestinationMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@Component({
  selector: 'page-destination-map',
  templateUrl: 'destination-map.html',
})
export class DestinationMapPage {

  autocomplete: any;
  GoogleAutocomplete: any;
  autocompleteItems: any;
  geocoder: any;
  destination: any

  constructor(public zone: NgZone, params: NavParams, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
    this.destination = params.get('destination');
    if (this.destination) {
      this.autocomplete = { input: this.destination[1].description };
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OriginMapPage');
  }

  dismiss() {
    this.viewCtrl.dismiss(this.destination);
  }

  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      });
  }

  selectSearchResult(item) {
    this.autocompleteItems = [];
    this.viewCtrl.dismiss([{ 'placeId': item.place_id }, { 'description': item.description }]);
  }

}
