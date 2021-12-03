import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarioModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})

export class CrearUsuarioComponent implements OnInit {
  usuarioform: FormGroup;
  titulo = 'Registrar usuario';
  id:string | null;

  constructor(private fb: FormBuilder, private router: Router,
    private toastr: ToastrService, private _usuarioService: UsuarioService,
    private aRouter: ActivatedRoute) {

    this.usuarioform = this.fb.group({
      cedula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      celular: ['', Validators.required],
      ciudad: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    this.enEditarUsuario();
  }

  agregarUsuario() {
    const USUARIO: Usuario = {
      cedula: this.usuarioform.get('cedula')?.value,
      nombre: this.usuarioform.get('nombre')?.value,
      correo: this.usuarioform.get('correo')?.value,
      celular: this.usuarioform.get('celular')?.value,
      ciudad: this.usuarioform.get('ciudad')?.value
    }

    if (this.id !== null) {
      this._usuarioService.editarUsuario(this.id, USUARIO).subscribe(data => {
        this.toastr.success('Usuario editado con exito', 'Usuario editado')
        this.router.navigate(['/'])
      }, error => {
        console.log(error);
        this.usuarioform.reset();
      })
    } else {
      console.log(USUARIO);
      this._usuarioService.guardarUsuario(USUARIO).subscribe(data => {
        this.toastr.success('Usuario agregado con exito', 'Usuario registrado')
        this.router.navigate(['/'])
      }, error => {
        console.log(error);
        this.usuarioform.reset();
      })
    }
  }

  enEditarUsuario() {
    if (this.id !== null) {
      this.titulo = 'Editar usuario';
      this._usuarioService.obtenerUser(this.id).subscribe(data => {
        this.usuarioform.setValue({ 
          cedula: data.cedula,
          nombre: data.nombre,
          correo: data.correo,
          celular: data.celular,
          ciudad: data.ciudad
        })
      })
    }
  }
}