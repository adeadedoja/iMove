import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { OriginMapPage } from '../origin-map/origin-map';
import { DestinationMapPage } from '../destination-map/destination-map';
import { FormPage } from '../form/form';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = { lat: -26.1842622, lng: 28.1098723 };
  end = { lat: -26.1842622, lng: 28.1098723 };
  origin: any;
  destination: any;
  subtitle: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  form = {
    title: '',
    type: '',
    description: ''
  };
  location = {
    origin: 'Your Origin',
    destination: 'Your Destination'
  };

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private alertCtrl: AlertController) {
    this.start = { lat: -26.1842622, lng: 28.1098723 };
    this.end = { lat: -26.1842622, lng: 28.1098723 };
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: { lat: -26.1842622, lng: 28.1098723 }
    });

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        //window.alert('Directions request failed due to ' + status);
      }
    });
  }

  logForm(form) {
    console.log(form.value)
  }

  openOriginModal() {
    let originModal = this.modalCtrl.create(OriginMapPage, { origin: this.origin });
    originModal.onDidDismiss(origin => {
      this.origin = origin;
      this.start = origin[0];
      this.location.origin = origin[1].description;
    });
    originModal.present();
  }

  openDestinationModal() {
    let destinationModal = this.modalCtrl.create(DestinationMapPage, { destination: this.destination });
    destinationModal.onDidDismiss(destination => {
      this.destination = destination;
      this.end = destination[0];
      this.location.destination = destination[1].description
    });
    destinationModal.present();
  }

  checkIfComplete(){
    if (this.location.origin == 'Your Origin') {
      this.subtitle = "Fill in your correct origin";
    }
    if (this.location.destination == 'Your Destination') {
      this.subtitle = "Fill in your correct destination";
    }
    let alert = this.alertCtrl.create({
      title: 'Please complete fields',
      subTitle: this.subtitle,
      buttons: ['Try again']
    });
    alert.present();
  }

  go() {
    if ((this.location.origin == 'Your Origin') || (this.location.destination == 'Your Destination')) {
      this.checkIfComplete();
    } else {
      this.navCtrl.push(FormPage, {
        origin: this.origin,
        destination: this.destination
      });
    }
  }

}
