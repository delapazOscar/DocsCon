import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-terminos-y-condiciones',
  templateUrl: './modal-terminos-y-condiciones.page.html',
  styleUrls: ['./modal-terminos-y-condiciones.page.scss'],
})
export class ModalTerminosYCondicionesPage implements OnInit {

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

}
