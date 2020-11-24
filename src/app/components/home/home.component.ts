import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { PrincipalService } from '../../service/principal.service';
import { NgForm } from '@angular/forms/esm2015/src/directives/ng_form';
import { Parametros } from '../../models/seleccionCable';
import { NuevaSel } from '../../models/seleccionCable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public nombre = "";
  public correo = "";
  public estado = "";
  public sesion = "";
  public materiales = [];
  public proyectos = [];
  public selecciones = [];
  public idUsuario = "";
  public ampacidadCorregida = "";

  parametros: Parametros = {
    corriente: "",
    tension: "",
    instalacion: "",
    material: "",
    proyecto: ""
  };
  public isError = false;
  errorRequestMsg: string = "";
  public materialSel = "";
  public isTable = false;

  nuevaSel: NuevaSel = {
    nombre: ""
  };
  public notificationRequestMsg = "";
  public isSave = false;

  public selSugerida = [];

  constructor(private router: Router, private principalService: PrincipalService) { }

  ngOnInit(): void {

    if (localStorage.getItem('correo') == null && localStorage.getItem('id') == null) {
      this.router.navigate(['/']);
    }
    this.nombre = localStorage.getItem('nombre');
    this.correo = localStorage.getItem('correo');
    this.estado = localStorage.getItem('nombreEstado');
    this.sesion = localStorage.getItem('idEstado');
    this.idUsuario = localStorage.getItem('id');

    this.principalService.obtenerMateriales().subscribe(data1 => { this.materiales = data1.respuesta; });
    this.principalService.obtenerProyectos().subscribe(data2 => { this.proyectos = data2.respuesta; })
    this.principalService.obtenerSelecciones(localStorage.getItem('id')).subscribe(data3 => { this.selecciones = data3.respuesta; })

  }

  validarProyecto(idUsuario: any, idProyecto: any): void {

    this.principalService.validarPermisos(idUsuario, idProyecto)
      .subscribe(data => {


        if (data.codigo == 100) {
          this.isError = false;
          this.principalService.obtenerAmpacidad(this.parametros.corriente)
            .subscribe(data2 => {
              if (data2) {
                this.ampacidadCorregida = data2;
                this.isError = false;
                this.principalService.obtenerSeleccion(this.ampacidadCorregida, this.parametros.material)
                  .subscribe(data3 => {
                    if (data3.codigo == 100) {
                      this.isTable = true;
                      this.selSugerida = data3.respuesta[0];
                    }
                    else {
                      this.isTable = false;
                    }
                  });
              }
            });

        }
        else {
          this.errorRequestMsg = data.respuesta;
          this.isError = true;
          this.isTable = false;

        }
      });
  }

  buscarSeleccion(form: NgForm) {
    if (form.valid) {
      this.isSave = false;

      this.validarProyecto(localStorage.getItem('id'), this.parametros.proyecto);
    }
  }

  guardarSeleccion(form: NgForm) {
    if (form.valid) {

      this.principalService.almacenarSelecion(this.nuevaSel.nombre, this.selSugerida['codigo'], localStorage.getItem('id'), this.parametros.proyecto, this.parametros.instalacion, this.parametros.corriente)
        .subscribe(data => {
          if (data) {
            console.log(data);
            this.isSave = true;
            this.notificationRequestMsg = "Se ha creado una nueva Seleccion de Cable";
            this.principalService.obtenerSelecciones(localStorage.getItem('id')).subscribe(data3 => { this.selecciones = data3.respuesta; })


            this.nombre = "";
            this.correo = "";
            this.estado = "";
            this.sesion = "";
            this.materiales = [];
            this.proyectos = [];
            this.selecciones = [];
            this.idUsuario = "";
            this.ampacidadCorregida = "";


            this.parametros.corriente = "";
            this.parametros.tension = "";
            this.parametros.instalacion = "";
            this.parametros.material = "";
            this.parametros.proyecto = "";

            this.isError = false;
            this.errorRequestMsg = "";
            this.materialSel = "";
            this.isTable = false;


            this.nuevaSel.nombre = ""

            this.notificationRequestMsg = "";
            this.isSave = false;

            this.selSugerida = [];
          }
        });
    }

  }

  ngOnChanges(changes: any) {
    this.principalService.obtenerSelecciones(localStorage.getItem('id')).subscribe(data3 => { this.selecciones = data3.respuesta; })

  }



}





