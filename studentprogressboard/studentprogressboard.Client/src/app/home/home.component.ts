import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AdminGuard} from "../AdminGuard";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router, private adminGuard: AdminGuard) {

  }

  isAdmin(): boolean {
    return this.adminGuard.isAdmin();
  }

}
