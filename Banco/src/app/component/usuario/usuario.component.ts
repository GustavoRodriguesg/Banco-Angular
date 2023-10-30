import { Component, OnInit } from '@angular/core';

import { Conta } from 'src/app/Conta';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/Usuario';
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

  export class UsuarioComponent implements OnInit {
    faCity = faCity;
    protected usuario:Conta =new Usuario('','','')
    protected deposito:boolean=false
    protected saque:boolean=false
    protected saldo:number=0
  
    constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
   
    }
  
    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.buscarDadosUsuarioPorId(id);
      }
    }
    
  
    private buscarDadosUsuarioPorId(id: string) {
     
      const usuariosStorage = localStorage.getItem('Usuarios');
      const usuariosNoLocalStorage = usuariosStorage ? JSON.parse(usuariosStorage) : [];
  
    
      const usuarioCorrespondente = usuariosNoLocalStorage.find((usuario:Conta) => usuario.id === Number(id));
  
      
      if (usuarioCorrespondente) {
        this.usuario.nome = usuarioCorrespondente.nome;
        this.usuario.saldo = usuarioCorrespondente.saldo;
        this.usuario.email=usuarioCorrespondente.email
        this.usuario.id=usuarioCorrespondente.id
        this.usuario.senha=usuarioCorrespondente.senha
      }
    }
    depositar=()=>{
      if(this.deposito===false){
      this.deposito=true
      this.saque=false
     
    }else{
        this.deposito=false
        this.saque=false
      }

    }
    sacar=()=>{
      if(this.saque===false){
        this.saque=true
        this.deposito=false
      }
        else{
          this.saque=false
          this.deposito=false
        }
    }
    realizarSaque=()=>{
      this.saque=false
      this.usuario.saldo-=this.saldo
      this.saldo=0
      const usuariosStorage = localStorage.getItem('Usuarios');
      const usuariosNoLocalStorage = usuariosStorage ? JSON.parse(usuariosStorage) : [];
     
    
      
      const usuarioCorrespondente = usuariosNoLocalStorage.find((usuario: Conta) => usuario.id === this.usuario.id);
    
      if (usuarioCorrespondente) {
      
        usuarioCorrespondente.saldo = this.usuario.saldo;
        
        localStorage.setItem('Usuarios', JSON.stringify(usuariosNoLocalStorage));
        


      }
      
    }
    realizarDeposito=()=>{
      this.deposito=false
      this.usuario.saldo+=this.saldo
      this.saldo=0
      const usuariosStorage = localStorage.getItem('Usuarios');
      const usuariosNoLocalStorage = usuariosStorage ? JSON.parse(usuariosStorage) : [];
    
    
      const usuarioCorrespondente = usuariosNoLocalStorage.find((usuario: Conta) => usuario.id === this.usuario.id);
    
      if (usuarioCorrespondente) {
      
        usuarioCorrespondente.saldo = this.usuario.saldo;        
        localStorage.setItem('Usuarios', JSON.stringify(usuariosNoLocalStorage));
      }
    

      
    }

  }
