export interface Seleccion{
    nombre: string,
    codigoCatalogo: number,
    idUsuario: number,
    idProyecto: number,
    instalacion: string
}

export interface User{
    usuario:string;
    contrasena:string;    
}

export interface Parametros{
    corriente: any;
    tension: any;
    instalacion: string;
    material: any;
    proyecto: any ;  
}

export interface NuevaSel{
    nombre:string;   
}

