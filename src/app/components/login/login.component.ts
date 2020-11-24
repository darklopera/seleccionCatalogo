import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

import { PrincipalService } from '../../service/principal.service';
import { NgForm } from '@angular/forms/esm2015/src/directives/ng_form';
import { User } from '../../models/seleccionCable';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser: any = [];
  errorRequestMsg: string = "";
  user: User = {
    usuario: "",
    contrasena: ""
  };
  public isError = false;
  public isErrorService = false;
  progressBarShow = false;
  

  constructor(private principalService: PrincipalService, private router:Router) { 
    
  }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      const md5 = new Md5();
      return this.principalService.validarLogin(this.user.usuario, md5.appendStr(this.user.contrasena).end())
        .subscribe(data => {
          
          if(data.codigo==100){
            this.principalService.setUser(
            data.respuesta[0].id, data.respuesta[0].nombre, data.respuesta[0].correo, data.respuesta[0].idEstado, data.respuesta[0].nombreEstado);
            this.router.navigate(['/home']);
          }
          else{
            this.isError=true;
            this.errorRequestMsg=data.respuesta;
            
          }
        });
    }
  }
}