import { Component, OnInit } from '@angular/core';
import { LoginPage } from '../login/login.page';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router, public formBuilder:FormBuilder, public alertController:AlertController,
    private loadingController: LoadingController,
    private authService: AuthService
    //private authService: AuthService,
    ) {
    this.registerForm = this.formBuilder.group({
      names: ['', Validators.required],
      lastnames: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

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

  async saveData(){
    var f = this.registerForm.value;

    if(this.registerForm.invalid){
      if(this.registerForm.get('password')?.hasError('minlength')){
        const alert = await this.alertController.create({
          header: 'Error en contraseña',
          message: '***La contraseña debe ser de almenos 6 caracteres***',
          buttons: ['OK'],
        });
        await alert.present();
      }else if(this.registerForm.get('email')?.hasError('email')){
        const alert = await this.alertController.create({
          header: 'Error en Email',
          message: '***Ingresa un email válido***',
          buttons: ['OK'],
        });
        await alert.present();
      }else{
        const alert = await this.alertController.create({
          header: 'Incompleto',
          message: '***Llena todos los campos***',
          buttons: ['OK'],
        });

        await alert.present();
      }

    }else{
       this.authService.register(this.registerForm.value)
         .then(async response =>{
           console.log(response);
           const alert = await this.alertController.create({
            header: '¡Registro exitoso!',
            buttons: ['OK'],
          });

          await alert.present();
           this.router.navigate(['/login']);
         })
         .catch(error => console.log(error));
    }
  }

  googleRegister(){
    this.authService.loginWithGoogle()
      .then(response =>{
        this.router.navigate(['login']);
      })
      .catch(error=>console.log(error));
  }

}
