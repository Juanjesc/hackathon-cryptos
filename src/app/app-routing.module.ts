import { HomeComponent } from './private/pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './public/autentificacion/pages/inicio/inicio.component';
import { PageErrorComponent } from './public/page-error/page-error.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '**',
    component: PageErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
