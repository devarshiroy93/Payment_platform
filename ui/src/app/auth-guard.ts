import { CanActivateFn, Router } from "@angular/router";
import { Observable, map, tap, } from "rxjs";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const AuthGuard: CanActivateFn = (): Observable<boolean> => {

    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    return authService.userDetails().pipe(
        tap((i) => {
            if (!i.id) {
                router.navigate(['../../login']);
            }
        }), map(i => !!i.id));

}