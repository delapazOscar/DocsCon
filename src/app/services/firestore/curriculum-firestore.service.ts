import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { File } from '@awesome-cordova-plugins/file/ngx';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, PageOrientation, PageSize } from 'pdfmake/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CurriculumFirestoreService {

  curriculumName: any;
  pdfOjb:any;
  uid:any;

  constructor(private firestore: AngularFirestore, private authService: AuthService,
    private fileOpener: FileOpener, private plt:Platform, private file:File) {
      this.getUid().then((uid) => {
        this.uid = uid;
      });
     }

    async getUid(){
      let uid = await this.authService.getUser();
      return uid;
    }

    async getDocumentData(uid: string, subcoleccion: string, documento: string): Promise<any> {
      try {
        const userRef = this.firestore.collection('users').doc(uid);
        const subcollectionRef = userRef.collection(subcoleccion);
        const documentRef = subcollectionRef.doc(documento);

        const snapshot = await documentRef.get().toPromise();
        if (snapshot && snapshot.exists) {
          const documentData = snapshot.data();
          console.log('Datos del documento:', documentData);
          return documentData;
        } else {
          console.log('El documento no existe.');
          return null;
        }
      } catch (error) {
        console.error('Error al obtener los datos del documento:', error);
        return null;
      }
    }

    async pdfDownload(userData:any, documentData:any){
      const formaciones = [];
      for (let i = 0; i < documentData.formacionCv.length; i++) {
        if (documentData.formacionCv[i]) {
          const form = [
            `${documentData.formacionCv[i]}`
          ];
          formaciones.push(form);
        }
      }
      const habilidades = [];
      for (let i = 0; i < documentData.habilitiesCv.length; i++) {
        if (documentData.habilitiesCv[i]) {
          const habi = [
            `${documentData.habilitiesCv[i]}`
          ];
          habilidades.push(habi);
        }
      }
      const idiomas = [];
      for (let i = 0; i < documentData.idiomsCv.length; i++) {
        if (documentData.idiomsCv[i]) {
          const idi = [
            `${documentData.idiomsCv[i]}`
          ];
          idiomas.push(idi);
        }
      }
      const experiencias = [];
      for (let i = 0; i < documentData.experienceCv.length; i++) {
        if (documentData.experienceCv[i]) {
          const exp = [
            `${documentData.experienceCv[i]}`
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
					      text: `${documentData.nameCv}`, fontSize: 16, width: 400, bold: true
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
                text: `\n${documentData.municipeCv}, ${documentData.selectedState} - ${documentData.emailCv} - ${documentData.numberCv}`, fontSize: 14, width: 450, alignments: 'center'
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
              text: `\n${documentData.descriptionCv}`, fontSize: 12
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

      if(this.plt.is('capacitor')){
        this.pdfOjb.getBuffer((buffer: Uint8Array) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });

          this.file.writeFile(this.file.dataDirectory, `${documentData.curriculumName}.pdf`, blob, { replace: true }).then(fileEntry =>{
            this.fileOpener.open(this.file.dataDirectory + `${documentData.curriculumName}.pdf`, 'application/pdf');
          });
        });
        return true;
      }else{
        return undefined;
      }
    }
}
