import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NgForm } from '@angular/forms';
import  {v4 as uuidv4}  from 'uuid';

declare var iziToast : any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token : any;
  public config : any = {};

  public titulo_cat ='';
  public icono_cat ='';

  public file:any = null;

  constructor(private _adminService: AdminService) { 
      this.token = localStorage.getItem('token');
      this._adminService.obtener_config(this.token).subscribe(
        response=>{
          this.config = response.data;
          console.log(this.config);
        }, 
        error=>{
          console.log(error);
        }
      );
    }

  ngOnInit(): void {
  }

  agregar_cat(){
    if(this.titulo_cat && this.icono_cat){
      console.log(uuidv4());

      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        _id:uuidv4()
      });

      this.titulo_cat='';
      this.icono_cat ='';

    }else{
      iziToast.show({
        backgroundColor: '#dc3424',
            class: 'text-danger',
            position: 'topRight',
            message: 'Debe ingresar un titulo e icono para la categoria',
            messageColor: '#FFFFFF',
            progressBarColor: '#FFFFFF'
      });
    }
  }

  actualizar(confForm: NgForm){
    if(confForm.valid){
      let data = {
        titulo : confForm.value.titulo,
        serie : confForm.value.serie,
        correlativo : confForm.value.correlativo,
        categorias : this.config.categorias,
        logo : this.file,
      }
    }else{
      iziToast.show({
        backgroundColor: '#dc3424',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos',
        messageColor: '#FFFFFF',
        progressBarColor: '#FFFFFF'
      });
    }
  }

}