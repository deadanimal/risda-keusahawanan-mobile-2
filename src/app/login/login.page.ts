import { Component, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { Observable } from "rxjs";
import { LoginModel } from "../services/login/login.model";
// import { AuthService } from '../services/auth.service';
import { LoginService } from "../services/login/login.service";
import { take, tap } from "rxjs/operators";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage-angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  users$: Observable<LoginModel[]>;

  checked: boolean;
  form: FormGroup;

  constructor(
    private loginService: LoginService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private storage: Storage,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      no_kp: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      // device_name: new FormControl(),
    });
    this.init();

    let rememberMe = localStorage.getItem("loggedIn");
    console.log("rememberMe", rememberMe);

    if (rememberMe == "true") {
      this.checked = true;
      let nokp = localStorage.getItem("nokp");
      let pass = localStorage.getItem("pass");

      this.form.patchValue({
        no_kp: nokp,
        password: pass,
      });
    }
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this.storage = storage;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Ralat",
      subHeader: "",
      message: "No Kad Pengenalan Atau Kata Laluan Tidak Sah",
      buttons: ["OK"],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "",
      subHeader: "",
      message:
        "Akaun Tidak Aktif. Sila Minta Admin Aktifkan Akaun Anda Untuk Meneruskan ke Aplikasi",
      buttons: ["OK"],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log("onDidDismiss resolved with role", role);
  }

  login() {
    console.log(this.form.value);
    this.loginService.check1user(this.form.value).subscribe((res) => {
      console.log("user", res);

      if (Object.keys(res).length === 0) {
        console.log("failed");

        this.presentAlert();
      } else {
        var setsession_user_id = window.sessionStorage.setItem(
          "user_id",
          res.id
        );
        var setsession_profile_status = window.sessionStorage.setItem(
          "profile_status",
          res.profile_status
        );
        var setsession_role = window.sessionStorage.setItem("role", res.type);

        if (res.type == 1) {
          // console.log("pegawai")
          var setsession_pegawai_id = window.sessionStorage.setItem(
            "pegawai_id",
            res.idpegawai
          );
          var setsession_perananpegawai = window.sessionStorage.setItem(
            "peranan_pegawai",
            res.role
          );
          // console.log(window.sessionStorage.getItem("pegawai_id"))
        } else if (res.type == 2) {
          // console.log("usahawan")
          var setsession_usahawan_id = window.sessionStorage.setItem(
            "usahawan_id",
            res.usahawanid
          );
        }

        if (this.checked == true) {
          this.loginService.setLoggedInStatus(true);

          localStorage.setItem("nokp", this.form.value.no_kp);
          localStorage.setItem("pass", this.form.value.password);
        } else {
          this.loginService.setLoggedInStatus(false);
          localStorage.removeItem("nokp");
          localStorage.removeItem("pass");
        }

        console.log("login success");
        // this.router.navigate(['/dashboard']);

        if (res.status_pengguna == 0) {
          this.presentAlert2();
        } else {
          if (res.profile_status == 0 || res.profile_status == 2) {
            // this.router.navigate(['/first-time-login']);
            console.log("why the hell");
          } else if (res.profile_status == 1) {
            this.router.navigate(["/dashboard"]);
          }
        }
      }
    });

    this.loginService.login(this.form.value).subscribe((res) => {
      console.log("token", res);
    });
  }

  numericOnly(event): boolean {
    let pattern = /^([0-9])$/;
    let result = pattern.test(event.key);
    return result;
  }

  forget_password() {
    this.router.navigate(["/forgot-password"]);
  }

  showPassword: boolean = false;
  isActiveToggleTextPassword: Boolean = true;
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword =
      this.isActiveToggleTextPassword == true ? false : true;

    this.showPassword = !this.showPassword;
  }
  public getType() {
    return this.isActiveToggleTextPassword ? "password" : "text";
  }

  addValue(e) {
    this.checked = !this.checked;
    console.log(this.checked);
  }
}
