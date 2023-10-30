import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { Conta } from 'src/app/Conta';
import { Usuario } from 'src/app/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  faCity = faCity;
  protected usuario:Conta =new Usuario('','','')
 
 


  constructor(private route: ActivatedRoute, private router: Router) {
   
   
  
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  verificarEmail() {

    

    
   

    const emailFornecido = this.usuario.email;

    const usuariosStorage = localStorage.getItem('Usuarios');
    
    const usuariosNoLocalStorage = usuariosStorage ? JSON.parse(usuariosStorage) : [];

    const usuarioCorrespondente = usuariosNoLocalStorage.find(
      (usuario: Conta) => 
      usuario.email === this.usuario.email 
      && usuario.senha===this.usuario.senha);

    if (usuarioCorrespondente && usuarioCorrespondente.email === emailFornecido) {
      this.router.navigate(['/login/' + usuarioCorrespondente.id]);
    } else {
      alert('Email ou senha não indentificados.');
    }
    
  }
  
}
