import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuarioModel';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {
  listUsuarios: Usuario[] = [];

  constructor(private _usuarioService: UsuarioService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this._usuarioService.getusuarios().subscribe(data => {
      console.log(data);
      this.listUsuarios = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarUsuario(id: any){
    this._usuarioService.eliminarUsuario(id).subscribe(data => {
      this.toastr.error('Este usuario fue eliminado', 'usuario eliminado');
      this.obtenerUsuarios();
    }, error => {
      console.log(error);   
    })
  }
}
