import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrls: ['./page-error.component.scss']
})
export class PageErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goBack(){
    this.router.navigate(['/'])
  }

}
