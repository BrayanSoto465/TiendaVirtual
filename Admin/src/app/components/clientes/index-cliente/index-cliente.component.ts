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
    this._clienteService.listar().subscribe(
      response=>{
        this.clientes = response.data;
      },
      error=>{
        console.log(error);
      }
    );
  }

  filtro(tipo : String){
    console.log(tipo); 
    console.log(this.filtro_nombre); 
    console.log(this.filtro_correo); 
  }

}
