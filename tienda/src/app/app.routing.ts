import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { ShowProductoComponent  } from './components/productos/show-producto/show-producto.component';

import { AuthGuard } from "./guards/auth.guard";
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
<<<<<<< HEAD
import { ContactoComponent } from './components/contacto/contacto.component';
=======
import { DireccionesComponent } from './components/usuario/direcciones/direcciones.component';
>>>>>>> 393aade481b0b9a4316fdffdb3e2e98b855bcdd9


const appRoute : Routes = [
  {path: '',component: InicioComponent},
  {path: 'login', component: LoginComponent},

  {path: 'cuenta/perfil',component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'cuenta/direcciones',component: DireccionesComponent, canActivate: [AuthGuard]},
  {path: 'carrito',component: CarritoComponent, canActivate: [AuthGuard]},

  {path: 'productos',component: IndexProductoComponent},
  {path: 'productos/categoria/:categoria',component: IndexProductoComponent},
  {path: 'productos/:slug', component: ShowProductoComponent},

  {path: 'contacto',component: ContactoComponent},
];

export const appRoutingProviders : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute); 