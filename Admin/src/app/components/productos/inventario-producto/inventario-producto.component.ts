import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast : any;
declare var $: any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public id : any;
  public token : any;
  public producto : any = {};
  public inventarios : Array<any> = [];
  public load_btn = false;

  constructor(private _route : ActivatedRoute, private _productoService : ProductoService) {
    this.token = localStorage.getItem('token');
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
                  console.log(this.inventarios);
                },
                error=>{
                  console.log(error);
                }
              )
            }
          },
          error=>{
            console.log(error);
          }
        );
      }
    );
  }

  eliminar(id : string){
    this.load_btn = true;
    this._productoService.eliminar_inventario(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          class: 'text-success',
          position: 'topRight',
          message: 'Se elimino correctamente el producto'
        });

        $('#delete-' + id).modal('hide');
        $('modal-backdrop').removeClass('show');

        this.load_btn = false;
        this._productoService.listar_producto(this.producto._id,this.token).subscribe(
          response=>{
            this.inventarios = response.data;
            console.log('Inventario ->' + this.inventarios);
          },
          error=>{
            console.log('Inventario ->' + error);
          }
        )
      },

      error=>{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-success',
          position: 'topRight',
          message: 'Ocurrio un error en el servidor'
        });

        $('#delete-' + id).modal('hide');
        $('modal-backdrop').removeClass('show'); 
      }
    );
  }

}
