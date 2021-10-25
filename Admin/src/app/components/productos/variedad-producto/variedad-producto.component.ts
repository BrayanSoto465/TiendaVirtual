import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var iziToast : any;

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent implements OnInit {

  public id : any;
  public token : any;
  public producto: any = {};  
  public inventarios : Array<any> = [];

  public nueva_variedad : string = '';
  public load_btn : boolean = false;
  public url;

  constructor(private _route : ActivatedRoute, private _productoService : ProductoService) { 
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;   
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._productoService.productooAdmin(this.id,this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.producto = undefined;
            }else{
              this.producto = response.data;

              this._productoService.listar_producto(this.producto._id,this.token).subscribe(
                response=>{
                  this.inventarios = response.data;
                },
                error=>{
                  console.log(error);
                }
              );
            }
          },
          error=>{
            console.log(error);
          }
        );
      }
    );
  }

  agregar_variedad(): void{
    if(this.nueva_variedad){
      this.producto.variedades.push({titulo: this.nueva_variedad});
      this.nueva_variedad = '';
    }else{
      iziToast.show({
        backgroundColor: '#dc3424',
            class: 'text-danger',
            position: 'topRight',
            message: 'EL campo de la variedad debe ser completada',
            messageColor: '#FFFFFF',
            progressBarColor: '#FFFFFF'
      });
    }
  }

  eliminar_variedad(id: any):void{
    this.producto.variedades.splice(id, 1);
  }

  actualizar():void{
    if(this.producto.titulo_variedad){
      this.load_btn = true;
      this._productoService.actualizar_variedades(this.id, 
        {
          titulo_variedad: this.producto.variedad_titulo,
          variedades : this.producto.variedades
        } ,this.token).subscribe(
          response=>{
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              class: 'text-success',
              position: 'topRight',
              message: 'Se actualizo correctamente las variedades'
            });
          },
          error=>{
            iziToast.show({
              backgroundColor: '#dc3424',
                  class: 'text-danger',
                  position: 'topRight',
                  message: 'Ocurrio un problema en el servidor',
                  messageColor: '#FFFFFF',
                  progressBarColor: '#FFFFFF'
            });
          }
        );

    }else{
      iziToast.show({
        backgroundColor: '#dc3424',
            class: 'text-danger',
            position: 'topRight',
            message: 'EL campo de la variedad debe ser completada',
            messageColor: '#FFFFFF',
            progressBarColor: '#FFFFFF'
      });
    }
    this.load_btn = false;
  }
}
