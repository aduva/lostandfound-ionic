import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormPage} from '../form/form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

  gotoFormPage() {
  	this.navCtrl.push(FormPage);
  }

}
