import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutentificacionModule } from './autentificacion/autentificacion.module';
import { PageErrorComponent } from './page-error/page-error.component';



@NgModule({
  declarations: [
    PageErrorComponent
  ],
  imports: [
    CommonModule,
    AutentificacionModule
  ]
})
export class PublicModule {}
