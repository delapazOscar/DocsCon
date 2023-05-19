import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-terms',
  templateUrl: './modal-terms.page.html',
  styleUrls: ['./modal-terms.page.scss'],
})
export class ModalTermsPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
