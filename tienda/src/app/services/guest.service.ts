import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GLOBAL } from './GLOBAL';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  obtener_producto_slug(slug: string): Observable<any> { 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'producto/obtener_producto_slug/' + slug, { headers: headers });
  }

  listar_productos_recomendados(categoria: string): Observable<any> { 
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'producto/listar_productos_recomendados/' + categoria, { headers: headers });
  }
}
