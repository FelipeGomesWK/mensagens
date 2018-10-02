import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersProvider {
  private API_URL = 'http://listademensagens/'

  constructor(public http: Http) { }

  public loginRemoto(email: string, senha: string) {
      return new Promise((resolve, reject) => {

      this.http.get(this.API_URL+"?email="+email+"&senha="+senha)
        .subscribe((result: any) => {
            resolve(result.json());
            },
            (error) => {
              reject(error.json());
      });
  });
}

  
}