import {Component, OnInit} from '@angular/core';
import {Geolocation} from 'ionic-native';
import {LoadingController} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
declare var google: any;

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit {

  public map: any;
  public currentPosMarker: any;

  constructor(private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.map = this.createMap();
    this.getCurrentLocation().subscribe(location => {
      this.centerLocation(location);
      this.setMarker(location);
    });
  }

  getCurrentLocation() {

    let loading = this.loadingCtrl.create({
      content: 'Определяем позицию...'
    });

    loading.present();

    let options = {timeout: 10000, enableHighOccuracy: true};

    let locationObs = Observable.create(observable => {
      Geolocation.getCurrentPosition(options).then(resp => {
        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;

        let location = new google.maps.LatLng(lat, lng);
        observable.next(location);
        loading.dismiss();
      }).catch(err => {
        console.log('Geolocation error:', err);
        loading.dismiss();
      });
    });

    return locationObs;
  }

  createMap(location = new google.maps.LatLng(43.2220, 76.8512)) {
    let mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapEl = document.getElementById('map');
    let map = new google.maps.Map(mapEl, mapOptions);

    return map;
  }

  centerLocation(location) {
    if (location) {
      this.map.panTo(location);
    } else {
      this.getCurrentLocation().subscribe(loc => {
        this.map.panTo(loc);
      });
    }
  }

  setMarker(location) {
    this.currentPosMarker = new google.maps.Marker({
      position: location,
      map: this.map,
      animation: google.maps.Animation.Drop
    });
  }
}
