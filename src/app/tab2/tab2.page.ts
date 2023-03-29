import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { delay } from 'rxjs';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };

  searching = false;
  constructor(private router:Router, private alertController:AlertController) { }

  ngOnInit() {
  }

  toogleSearch(){
    this.searching = !this.searching;
  }

  async addTemplateButton(){
    this.router.navigate(['welcome']);
  }

}
