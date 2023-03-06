import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { DocumentsService, Document } from '../services/documents.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

interface DocumentData {
  name?: string;
  icon?: string;
  color?: string;
  description?: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  isModalOpen = false;

  setOpen(isOpen: boolean){
    this.isModalOpen = isOpen;
  }

  public datos: DocumentData = {};

  constructor(private router:Router, private documentsService:DocumentsService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(p => {
      this.datos = this.documentsService.getDocumentsByName(p.get('name') ?? '')
      console.log(this.datos)

    })
  }

  navigateBack(){
    this.router.navigate(['welcome']);
  }

}
