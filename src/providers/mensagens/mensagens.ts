import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class MensagensProvider {
  
  constructor(public storage: Storage, public datepipe: DatePipe) { }

  public insert(mensagem: Mensagem) {
    let key = mensagem.idMensagem.toString();
    return this.save(key, mensagem);
  }
 
  private save(key: string, mensagem: Mensagem) {
    return this.storage.set(key, mensagem);
  }
 
  public getAll(email) {
 
    let mensagens: Mensagem[] = [];
 
    return this.storage.forEach((mensagem: Mensagem, key: string, iterationNumber: Number) => {
        if(mensagem.fkEmail == email){  
          mensagens.push(mensagem);
        }
    })
      .then(() => {
        return Promise.resolve(mensagens);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class Mensagem {
  idMensagem: number;
  mensagem: string;
  fkEmail: string;
}
 
export class ListaMensagem {
  key: string;
  mensagem: Mensagem;
}
