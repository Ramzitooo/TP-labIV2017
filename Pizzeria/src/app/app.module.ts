import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadModule } from "ng2-file-upload";//AGREGADO ARCHIVOS
import { ChartsModule } from 'ng2-charts';//AGREGO CHARTS
//COMPONENTES
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { LocalesComponent } from './locales/locales.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MenuComponent } from './menu/menu.component';
import { ClasesComponent } from './clases/clases.component';
import { RegistroComponent } from './registro/registro.component';
//SERVICIOS.
import { WsService }  from './services/ws/ws.service';
import { AutService } from './services/auth/aut.service';
import { VerificarJWTService } from './services/verificar-jwt/verificar-jwt.service';
//JSON WEB TOKEN.
import { JwtModule } from './jwt/jwt.module';
import { InicioComponent } from './inicio/inicio.component';
import { InformacionComponent } from './informacion/informacion.component';


const appRoutes: Routes = [
  { path: 'inicio',component: InicioComponent},
  { path: 'informacion',component: InformacionComponent},
  { path: 'login',component: LoginComponent},
  { path: 'productos', component: ProductosComponent, },
  { path: 'locales', component: LocalesComponent },
  { path: 'ofertas', component: OfertasComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', component: InicioComponent }
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
    ClasesComponent,
    InicioComponent,
    InformacionComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FileUploadModule,// AGREGO ARCHIVOS
    JwtModule,//AGREGO JWT.
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WsService,AutService,VerificarJWTService],//AGREGO SERVICIOS.
  bootstrap: [AppComponent]
})
export class AppModule { }
