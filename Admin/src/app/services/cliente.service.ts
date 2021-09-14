import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  listar(filtro:string | null): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'cliente/listar/'+filtro, { headers: headers });
  }

  create_admin(data : Object,token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.post(this.url + 'cliente/registro/administrador', data, { headers: headers });
  }
}
