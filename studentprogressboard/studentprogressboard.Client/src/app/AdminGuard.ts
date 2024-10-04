import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  userRole: string | null
  constructor(private apiService: ApiService, private router: Router) {}
  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
  }

  private getRole(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      // Accessing role using full namespace
      const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return role;
    } catch (error) {
      return null;
    }
  }
  isAdmin(): boolean {
    var token = localStorage.getItem('spmd-token') || "";
    if (this.getRole(token) == "Admin") {
      return true;
    } else {
      return false;
    }
  }
  canActivate(): boolean {
    if (this.isAdmin()) {
      return true;
    } else {
      // Redirect user to home or error page
      this.router.navigate(['/login']); // Change this to your home or error page URL
      return false;
    }
  }
}
