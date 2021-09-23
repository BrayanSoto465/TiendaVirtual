import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto: any = {
    categoria : ''
  };
  public file: any = null;
  public imgSelect : any | ArrayBuffer ='assets/img/error.png';
  public config : any = {};
  public token: any;
  public load_btn = false;

  constructor(private _productoService : ProductoService, private _adminService : AdminService, 
    private _router : Router) { 
    this.config = {
      height:500
    }
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

  registro(registroForm: NgForm){
    this.load_btn = true;
    if(registroForm.valid){
      console.log(this.producto);
      console.log(this.file);

      this._productoService.create_admin(this.producto,this.file,this.token).subscribe(
        response=>{console.log(response);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registro correctamente el nuevo producto'
          });

          this.load_btn = false;
          this._router.navigate(['panel/productos']);
        },
        error =>{
          console.log(error);
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
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/error.png';
        this.file = null;
    }
  }

  fileChangeEvent(event : any) : void{
    var file : any;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
    
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'la imagen no existe'
      });
    }

    if(file.size <= 4000000){
      //asdf
      if(file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        console.log(this.imgSelect)

        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);

        this.file = file;

      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/error.png';
        this.file = null;
      }

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'la imagen no puede superar los 4mb'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/error.png';
      this.file = null;
    }
    
    console.log(this.file);
  }
  
}
