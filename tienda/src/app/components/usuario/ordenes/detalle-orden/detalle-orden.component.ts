import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { StarRatingComponent } from 'ng-starrating';

declare var iziToast : any;

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {

  public url: any;
  public token: any;
  public orden : any = {};
  public load_data = true;
  public id : any;

  public totalstart = 5;
  public review: any = {};

  constructor(private _clienteService: ClienteService, private _route: ActivatedRoute) {
    this.url = GLOBAL.url;
    this.token = localStorage.getItem('token');
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );


    this._clienteService.obtener_orden(this.id, this.token).subscribe(
      response => {
        if(response.data != undefined){
          this.orden = response.data;
        }else{
          this.orden = undefined;
        }
        this.load_data = false;
      },error => {
        this.orden = undefined;
        iziToast.show({
          backgroundColor: '#dc3424',
          class: 'text-danger',
          position: 'topRight',
          message: 'Ocurrio un problema con el servidor',
          messageColor: '#FFFFFF',
          progressBarColor: '#FFFFFF'
        }); 
        this.load_data = false;
      }
    );
    
   }

  ngOnInit(): void {
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}): void {

  }

}
