import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { InicioComponent } from './components/inicio/inicio.component';
<<<<<<< HEAD
import { LoginComponent } from './components/login/login.component';
=======
import { SidebarComponent } from './components/sidebar/sidebar.component';
>>>>>>> 3308a3b5f34b2d35ae5a77b1c284b41aa78c312f

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
<<<<<<< HEAD
    LoginComponent
=======
    SidebarComponent
>>>>>>> 3308a3b5f34b2d35ae5a77b1c284b41aa78c312f
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
<<<<<<< HEAD
    //HttpClient,
=======
  /*   HttpClient, */
>>>>>>> 3308a3b5f34b2d35ae5a77b1c284b41aa78c312f
    HttpClientModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
