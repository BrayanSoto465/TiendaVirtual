import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ClienteService } from 'src/app/services/cliente.service';
import { AdminService } from 'src/app/services/admin.service';


declare var iziToast: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {
  public cliente: any = {
    genero: ''
  };
  public token: any = '';

  constructor(private _clienteService: ClienteService, private _adminService: AdminService, private _router: Router) { 
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

  registro(registroForm: NgForm){
    if(registroForm.valid){
      console.log(this.cliente);
      this._clienteService.create_admin(this.cliente,this.token).subscribe(
        response=>{
          
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registro correctamente el nuevo cliente'
          });

          this.cliente = {
            genero: '',
            nombres: '',
            email: '',
            f_nacimiento: '',
            telefono: '',
            dni: ''
          };

          this._router.navigate(['panel/clientes']);
        },
        error=>{
          console.log(error);
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            class: 'text-danger',
            position: 'topRight',
            message: 'Los datos del formulario no son validos'
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
}
