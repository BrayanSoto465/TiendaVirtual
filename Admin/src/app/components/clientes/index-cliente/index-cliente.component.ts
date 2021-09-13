import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes: Array<any> = [];
  public filtro_Buscar = '';

  public page = 1;
  public pageSize = 2;

  constructor(private _clienteService: ClienteService) { }

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this._clienteService.listar(null).subscribe(
      response => {
        this.clientes = response.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  filtro() {
    if (this.filtro_Buscar) {
      this._clienteService.listar(this.filtro_Buscar).subscribe(
        response => {
          this.clientes = response.data;
          console.log(this.filtro_Buscar);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.init_data();
    }
  }

}
