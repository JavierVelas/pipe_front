import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NosotrosComponent } from 'componentes/nosotros/nosotros.component';
import { LayoutComponent } from 'componentes/layout/layout.component';
import { UbicacionComponent } from 'componentes/ubicacion/ubicacion.component';
import { ProductosComponent } from 'componentes/productos/productos.component';
import { ContactoComponent } from 'componentes/contacto/contacto.component';
import { InicioComponent } from 'componentes/inicio/inicio.component';
import { ErrorComponent } from 'componentes/error/error.component';
import { LoginComponent } from 'componentes/login/login.component';
import { CorreoComponent } from 'componentes/correo/correo.component';
import { FeedbackComponent } from 'componentes/feedback/feedback.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { breadcrumb: 'Cerrar Sesión' } },
  { path: 'correo', component: CorreoComponent, data: { breadcrumb: 'Correo' } },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'nosotros', component: NosotrosComponent, data: { breadcrumb: 'Sobre Nosotros' } },
      { path: 'ubicacion', component: UbicacionComponent, data: { breadcrumb: 'Ubicación' } },
      { path: 'productos', component: ProductosComponent, data: { breadcrumb: 'Productos' } },
      { path: 'contacto', component: ContactoComponent, data: { breadcrumb: 'Contacto' } },
      { path: 'inicio', component: InicioComponent, data: { breadcrumb: 'Inicio' } },
      { path: 'feedback', component: FeedbackComponent, data: { breadcrumb: 'Retroalimentación' } },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  },
  { path: '**', component: ErrorComponent, data: { breadcrumb: 'Error' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
