import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Form page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-form',
  templateUrl: 'form.html'
})
export class FormPage {
	step = 1;
	totalSteps = 6;
	constructor(public navCtrl: NavController) {}

	ionViewDidLoad() {
		console.log('Hello FormPage Page', this.step);
	}

	continue() {
		this.step++;
		if (this.step === 7) {
			this.step = 1;
		}
	}

	getProgress() {
		let progress = 0;
		if (this.step !== 1) {
			progress = this.step * 100 / this.totalSteps;
		}
		return progress + '%';
	}

	goBack() {
		this.navCtrl.pop();
	}
}
