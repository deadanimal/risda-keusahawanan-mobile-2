import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ForgotPasswordService } from 'src/app/services/forgot-password/forgot-password.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-first-time-login',
  templateUrl: './first-time-login.page.html',
  styleUrls: ['./first-time-login.page.scss'],
})
export class FirstTimeLoginPage implements OnInit {

  private form: FormGroup;
  private form2: FormGroup;

  checked: boolean;



  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private forgotPassService: ForgotPasswordService,
    private loadingController: LoadingController,
    public alertController: AlertController
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required,],
      password: ['', [
        Validators.required,
        // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
        this.alphaNumericValidator

      ]],
      confirm_password: ['', Validators.required,],
    });


    this.form2 = this.formBuilder.group({
      password: ['', [
        Validators.required, this.alphaNumericValidator
      ],
      ],
      confirm_password: ['', Validators.required,],
    });
  }

  user_id : any
  profile_status: any


  ngOnInit() {

    this.user_id = window.sessionStorage.getItem("user_id");
    this.profile_status = window.sessionStorage.getItem("profile_status");

    console.log("profile_status", this.profile_status)

    let rememberMe = localStorage.getItem('loggedIn');
    console.log('rememberMe', rememberMe)

    if (rememberMe == 'true') {

      this.checked = true;

    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: 'Adakah anda setuju untuk mengemaskini alamat email dan kata laluan?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ya',
          cssClass: "yes-custom",
          handler: () => {
            console.log('Confirm Okay');
            // this.presentAlert();

          }
        }
      ]
    });

    await alert.present();
  }


  errorMsg: string;
  async logForm() {

    console.log(this.form.value);

    if (this.form.value.password == this.form.value.confirm_password) {

      const loading = await this.loadingController.create({ message: 'Loading ...' });
      loading.present();

      this.forgotPassService.firstTimeLogin(this.form.value, this.user_id).subscribe((res) => {
        console.log("res", res);

        if (res == 'email already exist') {
          loading.dismiss();
          this.presentAlertEmailFailed()
        } else {

          //replace new password in local storage if remeber me is checked in the login page
          if (this.checked == true) {
            localStorage.setItem('pass', this.form.value.password);
          } else {
            localStorage.removeItem('pass');
          }


          loading.dismiss();
          this.presentAlertUpdatesucces()
        }
      });
    } else {
      this.presentAlertFailed()
    }

  }

  async presentAlertEmailFailed() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Harap Maaf',
      // subHeader: 'Subtitle',
      message: 'Email yang digunakan telah wujud',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlertFailed() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tidak Berjaya',
      // subHeader: 'Subtitle',
      message: 'Kata laluan tidak sepandan dengan pengesahan kata laluan',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentAlertUpdatesucces() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Kemaskini Berjaya',
      // subHeader: 'Subtitle',
      message: 'Email dan kata laluan berjaya dikemaskini',
      buttons: [
        {
          text: 'OK',
          // id: 'confirm-button',
          handler: () => {
            this.router.navigate(['/dashboard'])
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async logForm2() {

    console.log(this.form2.value);

    if (this.form2.value.password == this.form2.value.confirm_password) {
      console.log("berjaya");

      const loading = await this.loadingController.create({ message: 'Loading ...' });
      loading.present();

      this.forgotPassService.updatePassword(this.form2.value, this.user_id).subscribe((res) => {
        console.log("res", res);

        //replace new password in local storage if remeber me is checked in the login page
        if (this.checked == true) {
          localStorage.setItem('pass', this.form2.value.password);
        } else {
          localStorage.removeItem('pass');
        }

        loading.dismiss();
        this.presentAlertUpdatesucces()
      });
    } else {
      this.presentAlertFailed()
    }

  }


  alphaNumericValidator(control: FormControl): any {
    if (control.value !== null) {
      const valueLowerCase = control.value.match('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}');
      const isValid = valueLowerCase !== null;
      // eslint-disable-next-line no-console
      console.log('valueLowerCase', valueLowerCase);
      return isValid ? null : { numeric: true };
    }
  }

  showPassword: boolean = false;
  isActiveToggleTextPassword: Boolean = true;
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;

    this.showPassword = !this.showPassword

  }

  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }


  showConfirmPassword: boolean = false;
  isActiveToggleTextPassword2: Boolean = true;
  public toggleTextPassword2(): void {
    this.isActiveToggleTextPassword2 = (this.isActiveToggleTextPassword2 == true) ? false : true;

    this.showConfirmPassword = !this.showConfirmPassword

  }
  public getType2() {
    return this.isActiveToggleTextPassword2 ? 'password' : 'text';
  }
}
