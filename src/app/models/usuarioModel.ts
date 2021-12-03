export class Usuario {
    _id?: number;
    cedula: number;
    nombre: string;
    correo: string;
    celular: number;
    ciudad: string;

    constructor(cedula: number, nombre: string, correo: string, celular: number, ciudad: string) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.correo = correo;
        this.celular = celular;
        this.ciudad = ciudad;
    }
}