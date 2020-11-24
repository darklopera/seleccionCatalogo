import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { Seleccion } from '../models/seleccionCable';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  API_URI = 'http://localhost/catalogoCables/servicios'

  constructor(private htttp: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Accept": "*/*"
  });

  setUser(id: any, nombre: string, correo: string, idEstado: any, nombreEstado: string): void {
    localStorage.setItem("id", id);
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("correo", correo);
    localStorage.setItem("idEstado", idEstado);
    localStorage.setItem("nombreEstado", nombreEstado);

  }



  validarLogin(usuario: string, contrasena: any): Observable<any> {
    return this.htttp
      .post(
        `${this.API_URI}/verificarIngreso.php`,
        {
          usuario: usuario,
          contrasena: contrasena
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));

  }

  obtenerMateriales(): Observable<any> {
    return this.htttp
      .post(
        `${this.API_URI}/listarMateriales.php`,
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  obtenerProyectos(): Observable<any> {
    return this.htttp
      .post(
        `${this.API_URI}/listarProyectos.php`,
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  obtenerSelecciones(idUsuario: any): Observable<any> {
    console.log(idUsuario);
    return this.htttp
      .post(
        `${this.API_URI}/listarSeleccionesPorProyecto.php`,
        {
          idUsuario: idUsuario
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  validarPermisos(idUsuario: any, proyecto: any): Observable<any> {
    return this.htttp
      .post(
        `${this.API_URI}/verificarPermisos.php`,
        {
          idUsuario: idUsuario,
          proyecto: proyecto
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }


  logoutUser() {

    localStorage.removeItem("id");
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.removeItem("idEstado");
    localStorage.removeItem("nombreEstado");
  }

  obtenerSeleccion(ampacidad: any, material: any): Observable<any> {
    return this.htttp
      .post(
        `${this.API_URI}/buscarSemejante.php`,
        {
          ampacidad: ampacidad,
          material: material
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  obtenerAmpacidad(ampacidad: any): Observable<any> {
    return this.htttp
      .post(
        `${this.API_URI}/verificarAmpacidad.php`,
        {
          ampacidad: ampacidad
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  almacenarSelecion(nombre: string, codigoCatalogo: any, idUsuario: any, proyecto: string, instalacion: string, corriente: string): Observable<any> {
    return this.htttp
      .post(
        `${this.API_URI}/insertarSeleccion.php`,
        {
          nombre: nombre,
          codigoCatalogo: codigoCatalogo,
          idUsuario: idUsuario,
          proyecto: proyecto,
          instalacion: instalacion,
          corriente: corriente
        },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }
}
