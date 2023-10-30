import { Component } from '@angular/core';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { Conta } from 'src/app/Conta';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  faCity = faCity;

  constructor() {
  
  }

  cadastrarUsuario(formulario: NgForm) {
    if (formulario.valid) {
      const nome = formulario.value.nome;
      const email = formulario.value.email;
      const senha = formulario.value.senha;

    
      const usuario: Usuario = new Usuario(nome, email, senha);

      if (this.emailJaCadastrado(usuario.email)) {
        alert('Email já cadastrado');
      } else {
        this.salvarUsuario(usuario);
        alert('Cadastro realizado com sucesso');
        formulario.resetForm();
      }
    } else {
      alert('Todos os campos precisam estar preenchidos !!!');
    }
  }

  private emailJaCadastrado(email: string): boolean {
    const usuariosStorage = localStorage.getItem('Usuarios');
    const usuariosNoLocalStorage = usuariosStorage ? JSON.parse(usuariosStorage) : [];
    return usuariosNoLocalStorage.some((usuario: Usuario) => usuario.email === email);
  }

  private salvarUsuario(usuario: Usuario): void {
    let lastId = localStorage.getItem('lastId');
    let id: number;

    if (lastId !== null) {
      id = parseInt(lastId);
    } else {
      id = 0;
    }

    id++;
    usuario.id = id;

    let usuariosStorage = localStorage.getItem('Usuarios');
    let usuariosNoLocalStorage = usuariosStorage ? JSON.parse(usuariosStorage) : [];
    usuariosNoLocalStorage.push(usuario);

    localStorage.setItem('lastId', id.toString());
    localStorage.setItem('Usuarios', JSON.stringify(usuariosNoLocalStorage));
  }
}

class Usuario implements Conta {
  id: number;
  nome: string;
  email: string;
  senha: string;
  saldo: number;

  constructor(nome: string, email: string, senha: string) {
    this.id = 0;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.saldo = 0;
  }
}
