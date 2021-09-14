import { AdminService } from "./../../../services/admin.service";
import { User } from "./../../../models/user";
import { AuthService } from "./../../../services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Admin } from "src/app/models/admin";

@Component({
  selector: "app-adm-editar-perfil",
  templateUrl: "./adm-editar-perfil.component.html",
  styleUrls: ["./adm-editar-perfil.component.scss"],
})
export class AdmEditarPerfilComponent implements OnInit {
  admin: Admin = {} as Admin;

  newImage: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.authService.afAuth.onAuthStateChanged((user) => {
      if (user)
        this.admin = JSON.parse(localStorage.getItem("currentUser") || "{}");
      else this.router.navigate(["/login"]);
    });
  }

  defaultImage: any = "../../../../assets/perfil-padrao.jpg";

  CELULAR = "(00) 0 0000-0000"; //Mask para celular
  TELEFONE = "(00) 0000-0000"; //Mask para telefone
  phoneMask = this.TELEFONE;
  phoneLength = "";
  previousLength = 0;

  onPhoneChanged() {
    //Função que checa o tamanho do numero, se for maior que 10 é telefone, senão é celular
    if (this.phoneLength.length <= 10 && this.phoneMask === this.CELULAR) {
      this.phoneMask = this.TELEFONE;
    } else if (
      this.phoneLength.length === 10 &&
      this.phoneMask === this.TELEFONE &&
      this.previousLength === 10
    ) {
      this.phoneMask = this.CELULAR;
    }

    this.previousLength = this.phoneLength.length;
  }

  returnToProfile() {
    this.router.navigate(["verPerfilAdm"]);
  }

  editPhoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      let fileReader = new FileReader();
      this.newImage = event.target.files[0];
      fileReader.readAsDataURL(event.target.files[0]);

      fileReader.onload = (e) => {
        if (e) {
          this.admin.profilePicture = e.target?.result;
        }
      };
    }
  }

  editUserData() {
    this.adminService.uploadProfilePic(this.newImage, this.admin);
    this.adminService.downloadProfilePic(this.admin).then((imgUrl: any) => {
      this.admin.profilePicture = imgUrl;
      this.adminService.setAdmin(this.admin).then(() => {
        this.admin = JSON.parse(localStorage.getItem("currentUser") || "{}");
      });
    });
    this.returnToProfile();
    this.authService.displayMessage("Perfil Atualizado!", false);
    console.log(this.admin.profilePicture);
    console.log(this.admin);
  }
}
