import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
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
  public token: any = '';

  constructor(private _clienteService: ClienteService, private _adminService: AdminService ) {
    this.token = this._adminService.getToken();
   }
  

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this._clienteService.listar(null,this.token).subscribe(
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
      this._clienteService.listar(this.filtro_Buscar,this.token).subscribe(
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
