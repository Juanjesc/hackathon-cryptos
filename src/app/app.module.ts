import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PublicModule } from './public/public.module';
import { PrivateModule } from './private/private.module';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    PrivateModule,
    SharedModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
