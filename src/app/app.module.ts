import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NosotrosComponent } from 'componentes/nosotros/nosotros.component';
import { LayoutComponent } from 'componentes/layout/layout.component';
import { ContactoComponent } from 'componentes/contacto/contacto.component';
import { UbicacionComponent } from 'componentes/ubicacion/ubicacion.component';
import { ProductosComponent } from 'componentes/productos/productos.component';
import { InicioComponent } from 'componentes/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from 'componentes/error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'componentes/login/login.component';
import { CorreoComponent } from 'componentes/correo/correo.component';
import { FeedbackComponent } from 'componentes/feedback/feedback.component';
import { FilterPipe } from './services/filter.pipe';
import { BreadcrumbsComponent } from 'componentes/breadcrumbs/breadcrumbs.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { Component } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    NosotrosComponent,
    LayoutComponent,
    ContactoComponent,
    UbicacionComponent,
    ProductosComponent,
    InicioComponent,
    ErrorComponent,
    LoginComponent,
    CorreoComponent,
    FeedbackComponent,
    FilterPipe,
    BreadcrumbsComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production, // Habilita el Service Worker solo en producción
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
