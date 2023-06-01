import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, PageOrientation, PageSize } from 'pdfmake/interfaces';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { getuid } from 'process';
import { FirestoreDataService } from './firestore-data.service';
import { Platform } from '@ionic/angular';
import { buffer } from 'rxjs';

import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Plugins } from '@capacitor/core';
import { FileSystem } from '@awesome-cordova-plugins/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatosCurriculumService {

  nameCv: any;
  municipeCv: any;
  selectedState: any;
  emailCv: any;
  numberCv: any;
  descriptionCv: any;

  formacionCv: Array<any> = [];
  habilitiesCv: Array<any> = [];
  idiomsCv: Array<any> = [];
  experienceCv: Array<any> = [];

  curriculumName:any;

  pdfOjb:any;

  personalesFill: boolean = false;
  formacionFill: boolean = false;
  idiomasFill: boolean = false;
  habilidadesFill: boolean = false;
  experienciaFill: boolean = false;

  constructor(public angularFirestore: AngularFirestore, private authService: AuthService,
    private firestoreData: FirestoreDataService, private fileOpener: FileOpener, private plt:Platform, private file: File) { }

    async getUid(){
      let uid = await this.authService.getUser();
      return uid;
    }

    async firestoreCurriculum(){
      //debugger;
      //await this.getUid();
      const uid = await this.getUid();
      if(uid !== null){
        const subcoleccion = 'curriculums';
        const documento = this.curriculumName;
        const datos = { // Crea un objeto con los datos que deseas subir
          municipeCv: this.municipeCv,
          selectedState: this.selectedState,
          emailCv: this.emailCv,
          numberCv: this.numberCv,
          descriptionCv: this.descriptionCv,
          nameCv: this.nameCv,

          formacionCv: this.formacionCv,
          habilitiesCv: this.habilitiesCv,
          idiomsCv: this.idiomsCv,
          experienceCv: this.experienceCv,

          curriculumName:this.curriculumName,
          name: "Curriculum",
          icon: "./assets/img/curriculum.png",
          color: "linear-gradient(to bottom right, #4F91A5, #7ECEE8)",
          description: "Un currículum es un documento que sintetiza la información clave sobre la formación, experiencia y habilidades de una persona, con el objetivo de presentarse de manera efectiva a posibles empleadores o instituciones educativas. Es una herramienta fundamental en la búsqueda de empleo y en la solicitud de oportunidades profesionales."
        };
        console.log(datos)
        this.firestoreData.createDocument(datos, uid, subcoleccion, documento);
      }else{
        console.log('Error en UID');
      }
    }

    async pdfDownload(){
      const formaciones = [];
      for (let i = 0; i < this.formacionCv.length; i++) {
        if (this.formacionCv[i]) {
          const form = [
            `${this.formacionCv[i]}`
          ];
          formaciones.push(form);
        }
      }
      const habilidades = [];
      for (let i = 0; i < this.habilitiesCv.length; i++) {
        if (this.habilitiesCv[i]) {
          const habi = [
            `${this.habilitiesCv[i]}`
          ];
          habilidades.push(habi);
        }
      }
      const idiomas = [];
      for (let i = 0; i < this.idiomsCv.length; i++) {
        if (this.idiomsCv[i]) {
          const idi = [
            `${this.idiomsCv[i]}`
          ];
          idiomas.push(idi);
        }
      }
      const experiencias = [];
      for (let i = 0; i < this.experienceCv.length; i++) {
        if (this.experienceCv[i]) {
          const exp = [
            `${this.experienceCv[i]}`
          ];
          experiencias.push(exp);
        }
      }
      const docDef = {
        //"pageSize": "A4",
	      content: [
          {
            columns: [
				      {
					      text: '', width:130
				      },
				      {
					      text: `${this.nameCv}`, fontSize: 16, width: 400, bold: true
				      },
				      {
					      text: '', width:100
				      }
			      ]
          },
          {
            text: '_______________________________________________________________________________________________'
          },
          {
            columns: [
              {
                text: '\n', width:10
              },
              {
                text: `\n${this.municipeCv}, ${this.selectedState} - ${this.emailCv} - ${this.numberCv}`, fontSize: 14, width: 450, alignments: 'center'
              },
              {
                text: '\n', width:'*'
              }
            ]
          },
          {
              text: '\n\nSOBRE MÍ', fontSize: 14, bold:true
          },
          {
              text: `\n${this.descriptionCv}`, fontSize: 12
          },
          {
              text: '\n\nFORMACIÓN', fontSize: 14, bold:true
          },
          {
              text: '\n'
          },
          {
              //type: 'square',
              lineHeight: 1.8,
              ul: [
                ...formaciones
              ]
          },
          {
                  text: '\n\nHABILIDADES', fontSize: 14, bold:true
              },
              {
                  text: '\n'
              },
              {
                  columns: [
                      {
                        //type: "square",
                        lineHeight: 1.8,
                        ul: [
                          ...habilidades
                        ]
                      },
                  ]
              },
              {
                  text: '\n\nIDIOMAS', fontSize: 14, bold:true
              },
              {
                  text: '\n'
              },
              {
                  //type: 'square',
                  lineHeight: 1.8,
                  ul: [
                    ...idiomas
                  ]
          },
          {
              text: '\n\nEXPERIENCIA', fontSize: 14, bold:true
          },
          {
              text: '\n'
          },
          {
            //type: 'square',
            lineHeight: 1.8,
            ul: [
              ...experiencias
            ]
          },
    ]
      }
      this.pdfOjb = pdfMake.createPdf(docDef);

      this.pdfOjb.download(this.curriculumName + '.pdf');

      await this.firestoreCurriculum();
      this.openFile();
      this.resetValues();
    }

    openFile(){
      if(this.plt.is('capacitor')){
        this.pdfOjb.getBuffer((buffer: Uint8Array) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });

          this.file.writeFile(this.file.dataDirectory, `${this.curriculumName}.pdf`, blob, { replace: true }).then(fileEntry =>{
            this.fileOpener.open(this.file.dataDirectory + `${this.curriculumName}.pdf`, 'application/pdf');
          });
        });
        return true;
      }else{
        return undefined;
      }
    }

    resetValues() {
      this.nameCv = null;
      this.municipeCv = null;
      this.selectedState = null;
      this.emailCv = null;
      this.numberCv = null;
      this.descriptionCv = null;
      this.formacionCv = [];
      this.habilitiesCv = [];
      this.idiomsCv = [];
      this.experienceCv = [];
    }

    allValuesEntered(): boolean {
      return !!this.nameCv && !!this.municipeCv && !!this.selectedState && !!this.emailCv && !!this.numberCv &&
             !!this.descriptionCv && !!this.formacionCv && !!this.habilitiesCv && !!this.idiomsCv &&
             !!this.experienceCv;
    }


}
