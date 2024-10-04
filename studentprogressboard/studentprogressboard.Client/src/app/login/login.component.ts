import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TokenModel } from '../_models/TokenModel';
import { LoginModel } from '../_models/LoginModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
import * as msal from "@azure/msal-browser";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  LoginForm: LoginModel= new LoginModel();
  showErrorMessage=false;
  private msalInstance: msal.PublicClientApplication;
  constructor(private http:HttpClient, private router:Router, private snackBar: MatSnackBar, private api: ApiService){
    const msalConfig = {
      auth: {
        clientId: '0a5f9277-d1d9-45b7-8b43-84502e164861',
        authority: 'https://login.microsoftonline.com/1d6a56fa-705a-4bbc-8004-67a21d5e9b97 ',
      },
  }
    this.msalInstance = new msal.PublicClientApplication(msalConfig);
    this.msalInstance.initialize();
  }
  async LoginO365(): Promise<void> {
    try {
      const loginRequest = {
        scopes: ['user.read', 'mail.send']
      };
      const response = await this.msalInstance.loginPopup(loginRequest);
      if (response === null) {
        console.error('There was an error authenticating you (response was null)');
        return;
      }
      // Call your backend endpoint with the token and username/email
      const token = response.accessToken;
      this.ExchangeO365Token(token);
/*      console.log(response);
      console.log(token);*/
    } catch (error) {
      console.error('There was an unexpected error during the login process', error);
    }
  }
  public ExchangeO365Token(token : string) : void{
    this.http
      .post<TokenModel>("https://localhost:5057/api/Auth/Microsoft", {token})
      .subscribe(
        (success) => {
          this.snackBar.open("Login successful!", "Close", { duration: 5000 });
          localStorage.setItem('spmd-token', success.token)
          localStorage.setItem('spmd-token-expiration', success.expiration.toString())
          const tokenPayload = this.getRole(success.token);
          const userRole = tokenPayload ? tokenPayload.role : null;
          localStorage.setItem('userRole', userRole);
          this.router.navigate(['/home'])
          console.log(token)
         /* this.api.storeAuthenticationToken(token, userRole);
          console.log(this.api.getUserRole());
          console.log(tokenPayload)
          console.log("User role:", userRole);*/
        },
        (error) => {
          this.showErrorMessage = true;
          this.router.navigate(['/login'])
          this.snackBar.open("Error occured, please try again.", "Close", { duration: 5000 });
        })
  }
  public Login() : void {
    this.http
      .post<TokenModel>("https://localhost:5057/api/Auth", this.LoginForm)
      .subscribe(
        (success) => {
          this.snackBar.open("Login successful!", "Close", { duration: 5000 });
          localStorage.setItem('spmd-token', success.token);
          localStorage.setItem('spmd-token-expiration', success.expiration.toString());
          // Extracting user role from JWT token
          const tokenPayload = this.getRole(success.token)
          const userRole = tokenPayload ? tokenPayload.role : null;
          localStorage.setItem('userRole', userRole);
          this.router.navigate(['/home']);
          /*console.log(tokenPayload)
          console.log("User role:", userRole);*/
        },
        (error) => {
          this.showErrorMessage = true;
          this.router.navigate(['/login']);
          this.snackBar.open("Error occurred, please try again.", "Close", { duration: 5000 });
        }
      );
  }
  private getRole(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));

      // Accessing role using full namespace
      const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      return { ...payload, role };
    } catch (error) {
      return null;
    }
  }
  private extractUpnFromToken(token: string): string | null {
    try {
      // Split the token into three parts: header, payload, and signature
      const parts = token.split('.');
      // Extract the payload (middle part) and decode it
      const payload = JSON.parse(atob(parts[1]));
      // Extract the upn or unique_name from the payload
      const upn = payload.upn || payload.unique_name;
      return upn;
    } catch (error) {
      console.error('Error extracting UPN from token:', error);
      return null;
    }
  }
}
