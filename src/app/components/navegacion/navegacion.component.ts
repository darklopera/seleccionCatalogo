import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

import { PrincipalService } from '../../service/principal.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {


  constructor(private principalService: PrincipalService, private router:Router) {
  }

  ngOnInit(): void {

  }

  onLogout() {
    this.principalService.logoutUser();
    this.router.navigate(['/']);
  }



}
