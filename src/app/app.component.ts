import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tareaTablaFiltros';
  
  constructor(public route: Router){
    
  }
  ngOnInit(){
    console.log(this.route.url)
  }
}
