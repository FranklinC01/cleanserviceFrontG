import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';

//componentes nuestros
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';

const routes: Routes = [
  {path: '', component: ListarUsuarioComponent},
  {path: 'crear-usuario', component: CrearUsuarioComponent},
  {path: 'editar-usuario/:id', component: CrearUsuarioComponent},
  {path: '**', redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
