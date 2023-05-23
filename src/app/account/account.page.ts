import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  profile: DocumentData | undefined;
  uid: string | null = null;

  constructor(private router:Router, private authService: AuthService, private alertController: AlertController) {

   }

   async ngOnInit() {
    await this.getUid();
  }


  async getUid(){
    let uid = await this.authService.getUser();
    if(uid){
      this.uid = uid;
      localStorage.setItem('uid', uid);
      console.log(uid);
    } else {
      uid = localStorage.getItem('uid');
      if(uid){
        this.uid = uid;
      } else {
        console.log('No se pudo encontrar un UID válido');
      }
    }
  }

  async resetPassword() {
    if (this.uid) {
      this.authService.resetPassword(this.uid);
      this.presentSuccessAlert();
    } else {
      console.log('No valid UID found');
    }
  }

  validateEmail(email:string) {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Correo enviado',
      message: 'Se ha enviado un correo electrónico para restablecer tu contraseña.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El correo electrónico ingresado no es válido. Por favor, inténtalo de nuevo.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas borrar tu cuenta? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Borrado de cuenta cancelado');
          }
        },
        {
          text: 'Borrar',
          handler: async () => {
            await this.authService.deleteAccount();
            this.router.navigate(['home']);
          }
        }
      ]
    });

    await alert.present();
  }

  // navigateBack(){
  //   this.router.navigate(['welcome']);
  // }

}
