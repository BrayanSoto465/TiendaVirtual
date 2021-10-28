import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GLOBAL } from './GLOBAL';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login_cliente(data : Object): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'cliente/login',data, {headers: headers});  
  }

  cliente_guest(id : String, token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.get(this.url + 'cliente/cliente_guest/' + id,{ headers: headers });
  }

  cliente_actualizar_guest(id : String,data : Object,token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization': token});
    return this._http.put(this.url + 'cliente/cliente_actualizar_guest/'+id,data, {headers: headers});  
  }

  public isAuthenticated(): boolean {

    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }
    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      console.log(decodedToken);

      if(helper.isTokenExpired(token)){
        localStorage.clear();
        return false;
      }

      if (!decodedToken) {
        localStorage.clear();
        return false;
      }
    } catch (error) {
      localStorage.clear();
      return false;
    }
    return true;
  }
  
}
