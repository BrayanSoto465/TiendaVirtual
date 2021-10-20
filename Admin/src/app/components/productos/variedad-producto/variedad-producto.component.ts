import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast : any;

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent implements OnInit {

  public producto : any = {};
  public id : any;
  public token : any;
  public nueva_variedad ='';
  public load_btn = false;
  public url;
  
 

  constructor(
    private _route:ActivatedRoute,
    private _productoService:ProductoService
  ) { 

    
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this._productoService.productooAdmin(this.id,this.token).subscribe(
          response=>{
            if(response.data == undefined){
              this.producto = undefined;
            }else{
              this.producto = response.data;       
         
            }
            console.log(this.producto);
          },
          error=>{
            console.log(error);
          }
        );
      }
    );
  }

  ngOnInit(): void {
  }
  agregar_variedad(){
    if(this.nueva_variedad){
 
      this.producto.variedades.push({titulo: this.nueva_variedad});
      this.nueva_variedad = '';

    }else{
      iziToast.show({
        backgroundColor: '#dc3424',
            class: 'text-danger',
            position: 'topRight',
            message: 'El campo de la variedad debe ser completado',
            messageColor: '#FFFFFF',
            progressBarColor: '#FFFFFF'
      });
    }
  }

  eliminar_variedad(idx:any){
    this.producto.variedades.splice(idx,1);
  }

  actualizar(){
    if(this.producto.titulo_variedad){
      if(this.producto.variedades.length >=1){
        //Actualizar

        this.load_btn = true;
        this._productoService.actualizar_variedades({
          titulo_variedad: this.producto.titulo_variedad,
          variedades: this.producto.variedades
        },this.id, this.token).subscribe(
          response=>{
            console.log(response);

            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              class: 'text-success',
              position: 'topRight',
              message: 'Se actualizo correctamente las variedades'
            });

            this.load_btn = false;
          }
        )
      }else{
        iziToast.show({
          backgroundColor: '#dc3424',
              class: 'text-danger',
              position: 'topRight',
              message: 'Se debe agregar almenos una variedad',
              messageColor: '#FFFFFF',
              progressBarColor: '#FFFFFF'
        });
      }
      
    }else{
      iziToast.show({
        backgroundColor: '#dc3424',
            class: 'text-danger',
            position: 'topRight',
            message: 'Debe completar el titulo de la variedad',
            messageColor: '#FFFFFF',
            progressBarColor: '#FFFFFF'
      });
    }
  }

}
