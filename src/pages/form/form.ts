import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { OriginMapPage } from '../origin-map/origin-map';
import { DestinationMapPage } from '../destination-map/destination-map';
/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  start = { lat: -26.1842622, lng: 28.1098723 };
  end = { lat: -26.1842622, lng: 28.1098723 };
  origin: any;
  destination: any;
  location = {
    origin: 'Your Origin',
    destination: 'Your Destination'
  };
  listArray: any = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private alertCtrl: AlertController, public navParams: NavParams) {
    this.origin = navParams.get('origin');
    this.destination = navParams.get('destination');
    this.start = this.origin[0];
    this.location.origin = this.origin[1].description;
    this.end = this.destination[0];
    this.location.destination = this.destination[1].description;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Request Received',
      subTitle: 'On its way!!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  go(){
    console.log(this.listArray);
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

  addToList() {
    this.listArray.push({
      'roomName': '', "items":  
        [
          {"name": "" }
        ] 
      });
  }

  addItem(room) {
    room.items.push({ "name": "" });
    //console.log(item.items)
  } 

  removeItem(room, index) {
    room.items.splice(index, 1);
    //console.log(item.items)
  } 

  removeRoom(index) {
    this.listArray.splice(index, 1);
  }
}
