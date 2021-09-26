import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public productos: Array<any> = [];
  public filtro_buscar = '';
  public token: any = '';
  
  public load_data = true;
  public url;

  constructor(private _productoService: ProductoService) { 
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data(){
    this._productoService.listar(null, this.token).subscribe(
      response=>{
        this.productos = response.data;
        this.load_data = false;
      },
      error=>{

      }
    );
  }

  filtro(){
    this.load_data = true;
    if (this.filtro_buscar) {
      this._productoService.listar(this.filtro_buscar,this.token).subscribe(
        response => {
          this.load_data = false;
          this.productos = response.data;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.init_data();
    }
  }

  resetear(){
    this.filtro_buscar = '';
    this.init_data();
  }

}
