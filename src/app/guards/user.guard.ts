import { Injectable, inject } from "@angular/core";
import { TokenService } from "../services/token.service";
import { UserService } from "../services/user.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { LocalStorageService } from "../services/local-storage.service";

@Injectable({
    providedIn: 'root'
  })
export class UserGuard {

    constructor(
        private tokenService : TokenService,
        private userService : UserService,
        private localStorageService : LocalStorageService,
        private router : Router
    ){

    }
    
    canActivate(next: ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean {
        const isTokenExpired = this.tokenService.isTokenExpired();
        const isUserIdValid = this.tokenService.getUserId() > 0;
        debugger
        const userResponse = this.localStorageService.getValueFromLocalStorage("user");
        const isUser = userResponse?.role.name.toUpperCase() === "USER";

        if(!isTokenExpired && isUserIdValid && isUser) {
            return true;
        }else {
            // Nếu không authenticated, bạn có thể redirect hoặc trả về một UrlTree khác.
            // Ví dụ trả về trang login:
            this.router.navigate(['/homepage']);
            return false;
        }
        
    }

}

export const UserGuardFn : CanActivateFn = (next : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean => {
    return inject(UserGuard).canActivate(next, state);
}   