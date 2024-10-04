import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
// import { MsalService } from "@azure/msal-angular";
import { AuthenticationResult } from "@azure/msal-browser";
import {Student} from "./_models/student";

@Injectable({ providedIn: 'root' })
export class ApiService{
    constructor(
        private router: Router,
        private http: HttpClient,
        private snackBar: MatSnackBar,
        // private msalService: MsalService,
    ){
        this.router = router;
        this.http = http;
    }
    public isLoggedIn() :boolean{
        let token = localStorage.getItem('spmd-token');
        return token !== null;
    }
    public isAdmin(){
        this.http.get<any>('https://localhost:5057/api/Auth/')
        .subscribe(resp => {
            console.log(resp)
        });
    }
    public canActivate() : boolean {
        if (!this.isLoggedIn()) {
            this.router.navigate(['/login'])
            return false
        }
        return true;
    }
    public logOut(){
        // this.msalService.logout();
        localStorage.setItem('spmd-token', '')
        localStorage.setItem('spmd-token-expiration', '')
        localStorage.clear()
        this.router.navigate(['/home'])
    }

}
