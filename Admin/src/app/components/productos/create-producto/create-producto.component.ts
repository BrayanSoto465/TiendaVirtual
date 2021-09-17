import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms'

declare var iziToast: any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto: any = {
    categoria : ''
  };
  public file: File | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  registro(registroForm: NgForm){
    if(registroForm.valid){

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

  fileChangeEvent(event:any):void{

  }
}
