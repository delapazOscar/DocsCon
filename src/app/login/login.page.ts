import { Component, OnInit } from '@angular/core';
import { RegisterPage } from '../register/register.page';
import { WelcomePage } from '../welcome/welcome.page';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Auth } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  emailInput:string = '';

  constructor(private router: Router, public formBuilder:FormBuilder, public alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService
    ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit() {
  }

  RegisterPage(){
    this.router.navigate(['register']);
  }

  get email() {
		return this.loginForm.get('email');
	}

  get password() {
		return this.loginForm.get('password');
	}

  async showAlert(header:string, message:string) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}

  async login(){
    var f = this.loginForm.value;

    if(this.loginForm.invalid){
      if(this.loginForm.get('password')?.hasError('minlength')){
        const alert = await this.alertController.create({
          header: 'Error en contraseña',
          message: '***Longitud inválida***',
          buttons: ['OK']
        });
        await alert.present();
      }else if(this.loginForm.get('email')?.hasError('email')){
        const alert = await this.alertController.create({
          header: 'Error en Email',
          message: '***Ingresa un email válido***',
          buttons: ['OK']
        });
        await alert.present();
      }else{
        const alert = await this.alertController.create({
          header: 'Incompleto',
          message: '***Llena todos los campos***',
          buttons: ['OK']
        });

        await alert.present();
      }

    }else{
      // this.router.navigate(['welcome']);
      this.authService.login(this.loginForm.value)
         .then(async response =>{
           console.log(response);
           this.router.navigate(['welcome']);
         })
         .catch(async (error: any) => {
          console.log(error);
          const alert = await this.alertController.create({
            header: error.code === "auth/user-not-found" || error.code === "auth/wrong-password"
              ? "Correo o contraseña incorrectos"
              : error.code === "auth/user-not-verified"
                ? "Verifica tu correo electrónico"
                : "Verifica tu correo electrónico",
            message: error.message,
            buttons: ['OK'],
          });

          await alert.present();
        });
    }
  }

  googleRegister(){
    this.authService.loginWithGoogle()
      .then(response =>{
        this.router.navigate(['welcome']);
      })
      .catch(error=>console.log(error));
  }

  async resetPassword(){
    if(this.loginForm.value.email == ''){
      const alert = await this.alertController.create({
        header: 'Ingrese Email',
        message: '***Ingresa el email al que quieres reestablecer la contraseña***',
        buttons: ['OK']
      });

      await alert.present();
    }else if(this.loginForm.get('email')?.hasError('email')){
      const alert = await this.alertController.create({
        header: 'Error en Email',
        message: '***Ingresa un email válido***',
        buttons: ['OK']
      });
      await alert.present();
    }else{
      this.authService.resetPassword(this.loginForm.value.email);
      const alert = await this.alertController.create({
        header: 'Email Enviado',
        message: '***Abra el Email enviado y reestablezca la contraseña***',
        buttons: ['OK']
      });

      await alert.present();
      this.emailInput = '';
    }

  }
}
