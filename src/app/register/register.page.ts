import { Component, OnInit } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ModalTerminosYCondicionesPage } from '../modal-terminos-y-condiciones/modal-terminos-y-condiciones.page';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

interface User extends firebase.User {}
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  terms: any;

  pass: any;
  // private perfilesRef = this.afs.collection('perfiles');
  constructor(private router: Router, public formBuilder:FormBuilder, public alertController:AlertController,
    // private afs: AngularFirestore,
    private afAuth: AngularFireAuth, // <--- Agrega AngularFireAuth aquí
    private loadingController: LoadingController,
    private authService: AuthService,
    private modalCtrl: ModalController
    //private authService: AuthService,
    ) {
    this.registerForm = this.formBuilder.group({
      names: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastnames: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

   }
   emailValidator(control: FormControl) {
    const email = control.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(email);
    const hasAtSymbol = email.includes('@');

    if (!isEmailValid || !hasAtSymbol) {
      return { invalidEmail: true };
    }

    return null;
  }

  ngOnInit() {
  }

  get email() {
		return this.registerForm.get('email');
	}

  get password() {
		return this.registerForm.get('password');
	}

  get names() {
		return this.registerForm.get('names');
	}

  get lastnames() {
		return this.registerForm.get('lastnames');
	}



  otraPagina(){
    this.router.navigate(['login']);
  }

  async showAlert(header:string, message:string) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}

  async saveData() {
    if (!this.termsAccepted) {
      await this.showAlert('Error', 'Debe aceptar los términos y condiciones para registrarse.');
      return; // Prevent form submission
    }
    if (this.registerForm.invalid) {
      if (this.registerForm.get('password')?.hasError('minlength')) {
        await this.showAlert('Error en contraseña', 'La contraseña debe tener al menos 6 caracteres');
      } else if (this.registerForm.get('email')?.hasError('email')) {
        await this.showAlert('Error en Email', 'Ingresa un email válido');
      } else if (this.registerForm.get('email')?.hasError('pattern')) {
        await this.showAlert('Error en Email', 'Ingresa un email con formato válido');
      } else if (this.registerForm.get('names')?.hasError('pattern')) {
        await this.showAlert('Error en nombres', 'Ingresa solo letras en el campo de nombres');
      } else if (this.registerForm.get('lastnames')?.hasError('pattern')) {
        await this.showAlert('Error en apellidos', 'Ingresa solo letras en el campo de apellidos');
      } else {
        await this.showAlert('Incompleto', 'Llena todos los campos correctamente');
      }
    } else {
      this.authService
        .register(this.registerForm.value)
        .then(async (response) => {
          console.log(response);
          await this.showAlert('¡Registro exitoso!', 'Revisa tu bandeja de entrada y verifica el correo electrónico para usar la aplicación');
          this.registerForm.reset();
          this.pass = '';
          this.router.navigate(['/login']);
        })
        .catch(async (error) => {
          if (error.code === 'auth/email-already-in-use') {
            await this.showAlert('Error en Email', 'El correo ingresado ya tiene una cuenta existente');
            this.registerForm.reset();
          } else {
            console.log(error);
          }
        });
    }
  }

  // async googleRegister(){
  //   this.authService.registerWithGoogle()
  //     .then(async response =>{
  //       const loading = await this.loadingController.create({
  //         message: 'Registrando...',
  //         duration: 1000
  //         });

  //       await loading.present();
  //       await loading.onWillDismiss();
  //       this.router.navigate(['welcome']);
  //     })
  //     .catch(error=>console.log(error));
  // }
  message = 'This modal example uses the modalController to present and dismiss modals.';
  async openModalTerms(){
    const modal = await this.modalCtrl.create({
      component: ModalTerminosYCondicionesPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  termsAccepted: any;
  onCheck(event: any) {
    this.termsAccepted = event.detail.checked;
  }

}
