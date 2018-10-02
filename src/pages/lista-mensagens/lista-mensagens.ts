import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MensagensProvider, ListaMensagem } from '../../providers/mensagens/mensagens';


@IonicPage()
@Component({
  selector: 'page-lista-mensagens',
  templateUrl: 'lista-mensagens.html',
})
export class ListaMensagensPage {
  mensagens: ListaMensagem[] = [];
  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mensagensProvider: MensagensProvider, private toast: ToastController) {
    this.email = navParams.get('email');
   
  }

  ionViewDidLoad() {
    
    this.getAllMensagens(this.email);
  }


  getAllMensagens(email) {
    this.mensagensProvider.getAll(email)
      .then((result: any) => {
        for (var i = 0; i < result.length; i++) {
          let mensagem = new ListaMensagem();
          mensagem.key =  result[i].ke; 
          mensagem.mensagem =  result[i].mensagem;
          this.mensagens.push(mensagem);
        } 
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao listar mensagens.', position: 'botton', duration: 3000 }).present();
      });
  }

}
