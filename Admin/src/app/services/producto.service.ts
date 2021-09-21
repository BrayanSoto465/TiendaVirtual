import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GLOBAL } from './GLOBAL';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  create_admin(data: any, file: any, token: string ): Observable<any> {
    let headers = new HttpHeaders({'Authorization':token});

    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('stock',data.stock);
    fd.append('precio',data.precio);
    fd.append('descripcion',data.descripcion);
    fd.append('contenido',data.contenido);
    fd.append('categoria',data.categoria);
    fd.append('portada',file);

    return this._http.post(this.url + 'producto/producto/administrador', fd, { headers: headers });
  }

  listar(filtro:String  | null, token: string): Observable<any> {
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': token});
    return this._http.get(this.url + 'producto/listar/' + filtro, { headers: headers });
  }
}
