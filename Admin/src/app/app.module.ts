import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTinymceModule } from 'ngx-tinymce';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    IndexClienteComponent,
    SidebarComponent,
    CreateClienteComponent,
    EditClienteComponent,
    CreateProductoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    //HttpClient,
    HttpClientModule,
    //SidebarComponent,
    AppRoutingModule,
    routing,
    NgbPaginationModule,
    NgxTinymceModule.forRoot({
      baseURL:'../../../assets/tinymce/'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
