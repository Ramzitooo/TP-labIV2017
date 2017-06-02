import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { LocalesComponent } from './locales/locales.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MenuComponent } from './menu/menu.component';
import { ClasesComponent } from './clases/clases.component';

const appRoutes: Routes = [
  { path: 'login',component: LoginComponent},
  { path: 'productos', component: ProductosComponent, },
  { path: 'locales', component: LocalesComponent },
  { path: 'ofertas', component: OfertasComponent },
  { path: 'usuarios', component: UsuariosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    LocalesComponent,
    OfertasComponent,
    LoginComponent,
    UsuariosComponent,
    MenuComponent,
    ClasesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
