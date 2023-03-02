import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  searching = false;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  toogleSearch(){
    this.searching = !this.searching;
  }

  addTemplateButton(){
  }

}
