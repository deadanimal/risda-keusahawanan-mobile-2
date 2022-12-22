import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, EmailValidator } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { ForgotPasswordService } from 'src/app/services/forgot-password/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  private form: FormGroup;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private forgotPassService : ForgotPasswordService,
    private loadingController: LoadingController,
    public alertController: AlertController
    ) {
      this.form = this.formBuilder.group({
        email: ['', Validators.required, ],
        
      });
     }

  ngOnInit() {
  }


  async logForm() {

    // console.log(this.form.value);
    const loading = await this.loadingController.create({ message: 'Loading ...' });
    loading.present();

    this.forgotPassService.post(this.form.value).subscribe((res) => {
      console.log("res", res);

      loading.dismiss();

      console.log("title", res.title);

      if (res.title == "Berjaya") {
        this.presentSuccess(res.message)

      } else {
        this.presentFailed(res.message)
      }
      
    },(err) => {

      // loading.dismiss();
      loading.dismiss();
      alert('Something went wrong')
    });
  }

  async presentSuccess(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Berjaya',
      subHeader: '',
      message: message,
      buttons: [
        {
          text: 'Okay',
          // id: 'confirm-button',
          handler: () => {
            this.router.navigate(['/'])
          }
        }
      ]
     
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentFailed(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: 'Set Semula Kata Laluan Tidak Berjaya',
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



  forget_password(){
    this.router.navigate(['/'])
  }

}
