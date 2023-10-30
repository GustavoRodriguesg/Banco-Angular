import { Conta } from "./Conta";
export class Usuario implements Conta {
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