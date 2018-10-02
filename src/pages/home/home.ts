import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { ListaMensagensPage } from '../../pages/lista-mensagens/lista-mensagens';
import {  MensagensProvider, Mensagem } from '../../providers/mensagens/mensagens';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  model: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, 
              private userProvider: UsersProvider, public mensagensProvider: MensagensProvider, 
              public storage: Storage  ) {
    this.model = new User();

    
    this.model.email = 'teste@teste.com';
    this.model.senha = 'teste123';

    // dados para teste
    var mensagensLocais = {
      'row1' : {
          'idMensagem' : 1,
          'mensagem' : 'Passar no Mercado',
          'email' : 'teste@teste.com'
      },
      'row2' : {
        'idMensagem' : 2,
        'mensagem' : 'Ir ao parque no sábado',
        'email' : 'teste@teste.com'
      },
      'row3' : {
        'idMensagem' : 3,
        'mensagem' : 'Terminar o relatório',
        'email' : 'teste@teste.com'
      },
      'row4' : {
        'idMensagem' : 4,
        'mensagem' : 'Festa no fim de semana',
        'email' : 'teste2@teste.com'
      },
      'row5' : {
        'idMensagem' : 5,
        'mensagem' : 'Reunião na empresa',
        'email' : 'teste2@teste.com'
      },
  };

    this.storage.set(this.model.email,  this.model.senha);
    this.storage.set("teste2@teste.com",  "teste456");
    for(var k in mensagensLocais){
          var mensagem = new Mensagem;
          mensagem.idMensagem = mensagensLocais[k]["idMensagem"]  ;
          mensagem.mensagem = mensagensLocais[k]["mensagem"] ;
          mensagem.fkEmail = mensagensLocais[k]["email"];
          this.mensagensProvider.insert(mensagem);
        
    }

  }

  public login() {
    
    this.storage.get(this.model.email)
    .then((senha) => {
      console.log(senha);
    
    if(this.model.senha == senha){
      this.toast.create({ message: 'Usuário logado com sucesso.', position: 'botton', duration: 3000 }).present();
      this.navCtrl.push(ListaMensagensPage, {email: this.model.email});

    }else{
    this.userProvider.loginRemoto(this.model.email, this.model.senha)
      .then((result: any) => {
        
        if(result[0].codigo == 200){
          this.armazenarLoginLocal(this.model.email, this.model.senha);
          this.armazenarMensagensLocal(result);
          this.toast.create({ message: 'Usuário logado com sucesso.', position: 'botton', duration: 3000 }).present();
          this.navCtrl.push(ListaMensagensPage, {email: this.model.email});
        }else if(result[0].codigo == 400){
          this.toast.create({ message: 'Erro ao tentar efetuar login.', position: 'botton', duration: 3000 }).present();  
        }        
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao tentar efetuar login.', position: 'botton', duration: 3000 }).present();
      });
    }
    });
  }

  private armazenarLoginLocal(email: string, senha: string){
    this.storage.set(this.model.email,  this.model.senha);
  }

  private armazenarMensagensLocal(result){
      var listaMensagens = result[1];
      listaMensagens.forEach(linha => {
          var mensagem = new Mensagem;
          mensagem.idMensagem = linha.id_mensagem;
          mensagem.mensagem = linha.mensagem;
          mensagem.fkEmail = linha.fk_email;
          this.mensagensProvider.insert(mensagem);
      });
  }

  
}

export class User   {
  email: string;
  senha: string;
}
