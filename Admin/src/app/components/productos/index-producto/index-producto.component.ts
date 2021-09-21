import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public load_data = false;
  public productos: Array<any> = [];
  public filtro_buscar = '';
  public token: any = '';

  constructor(private _productoService: ProductoService) { 
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    this._productoService.listar(null, this.token).subscribe(
      response=>{
        this.productos = response.data;
      },
      error=>{

      }
    );
  }

  filtro(){
    
  }

}
