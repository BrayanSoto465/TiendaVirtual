import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { NgForm } from '@angular/forms';

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
  public idUser : any;
  public producto : any = {};
  public inventarios : Array<any> = [];
  public load_btn = false;
  public inventario : any = {};

  constructor(private _route : ActivatedRoute, private _productoService : ProductoService) {
    this.token = localStorage.getItem('token');
    this.idUser = localStorage.getItem('_id');
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
              this.cargar_datos();
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
        this.cargar_datos();
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

  registro_inventario(inventarioForm : NgForm){
    if(inventarioForm.valid){
      let data = {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        admin: this.idUser,
        proveedor: inventarioForm.value.proveedor,
      };

      this._productoService.crear_inventario(data, this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topRight',
            message: 'Se creo correctamente el inventario'
          });
          this.cargar_datos();
        },
        error=>{
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            class: 'text-danger',
            position: 'topRight',
            message: 'Hubo un problema con el servidor'
          });
        }
      );

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }

  cargar_datos(){
    this._productoService.listar_producto(this.producto._id,this.token).subscribe(
      response=>{
        this.inventarios = response.data;
      },
      error=>{
        console.log(error);
      }
    );
  }
}
