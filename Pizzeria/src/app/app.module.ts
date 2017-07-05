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
import { InicioComponent } from './inicio/inicio.component';
import { InformacionComponent } from './informacion/informacion.component';
//SERVICIOS.
import { WsService }  from './services/ws/ws.service';
import { AutService } from './services/auth/aut.service';
import { VerificarJWTService } from './services/verificar-jwt/verificar-jwt.service';
//JSON WEB TOKEN.
import { JwtModule } from './jwt/jwt.module';
//FIREBASE
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';


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

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDYy5JoxCaBAOVR0Y6ssbE08124MnAIpbk",
    authDomain: "pizzeria-b9c0d.firebaseapp.com",
    databaseURL: "https://pizzeria-b9c0d.firebaseio.com",
    projectId: "pizzeria-b9c0d",
    storageBucket: "pizzeria-b9c0d.appspot.com",
    messagingSenderId: "1002401146826"
  }
};

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
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [WsService,AutService,VerificarJWTService],//AGREGO SERVICIOS.
  bootstrap: [AppComponent]
})
export class AppModule { }
