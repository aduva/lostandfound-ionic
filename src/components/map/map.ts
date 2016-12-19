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

  setMarker1(location) {
    this.currentPosMarker = new google.maps.Marker({
      position: location,
      map: this.map,
      animation: google.maps.Animation.Drop,
      icon: '../assets/img/my-location.png',
      title: 'Вы здесь.'
    });
  }

  setMarker(location) {
    var overlay = new google.maps.OverlayView();
    overlay.draw = function() {
      console.log('hello');
      var div = this.div_;
      if (!div) {
        div = this.div_ = document.createElement('DIV');
        var dot = document.createElement('DIV');
        dot.classList.add('dot');

        var ring = document.createElement('DIV');
        ring.classList.add('ring');
  
        //you could/should do most of the above via styling the class added below
        div.classList.add('my-location');
        div.appendChild(dot);
        div.appendChild(ring);
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
        console.log(div);
      }

      var point = this.getProjection().fromLatLngToDivPixel(location);
      if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
      }
    };
    overlay.setMap(this.map);
  }
}
