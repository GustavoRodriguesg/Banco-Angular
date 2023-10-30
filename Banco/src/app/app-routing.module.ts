import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { CadastroComponent } from './component/cadastro/cadastro.component';

const routes: Routes = [
  {path:'',component: LoginComponent},
  {path:'login/:id',component: UsuarioComponent},
  {path:'cadastro',component: CadastroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
