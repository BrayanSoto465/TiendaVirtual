import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes : Array<any> = [];
  public filtro_nombre = ''; 
  public filtro_correo = '';

  constructor(private _clienteService : ClienteService) { }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this._clienteService.listar(null, null).subscribe(
      response=>{
        this.clientes = response.data;
      },
      error=>{
        console.log(error);
      }
    );
  }

  filtro(tipo : String){
    if(tipo == 'nombre'){
      if(this.filtro_nombre){
        this._clienteService.listar(tipo, this.filtro_nombre).subscribe(
          response=>{
            this.clientes = response.data;
          },
          error=>{
            console.log(error);
          }
        );
      }else{
        this.init_data();
      }
    }else if(tipo == 'correo'){
      if(this.filtro_correo){
        this._clienteService.listar(tipo, this.filtro_correo).subscribe(
          response=>{
            this.clientes = response.data;
          },
          error=>{
            console.log(error);
          }
        );
      }else{
        this.init_data();
      }
    }

    
  }

}
