import { Component } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  otraPagina(){
    this.router.navigate(['login']);
  }

}
