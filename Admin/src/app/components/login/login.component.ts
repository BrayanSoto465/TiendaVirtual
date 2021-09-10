import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms'

declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = { };

  constructor() {   }

  ngOnInit(): void {
  }

  login(loginForm : NgForm){
    if(loginForm.valid){
      console.log(this.user);
      alert("Es Valido")
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
