import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  // navigateBack(){
  //   this.router.navigate(['welcome']);
  // }

}
