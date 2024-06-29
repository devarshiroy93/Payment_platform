import { CanActivateFn, Router } from "@angular/router";
import { Observable, map, tap, } from "rxjs";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { GlobaUiStoreService, GlobalUiStore } from "./globa-ui-store.service";

export const AuthGuard: CanActivateFn = (): Observable<boolean> => {

    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    const globalUiStore: GlobaUiStoreService = inject(GlobaUiStoreService);
    return authService.userDetails().pipe(
        tap((i) => {
            if (!i.id) {
                router.navigate(['../../login']);
            }
            globalUiStore.updateGlobalUi({
                user: i
            })
        }), map(i => !!i.id));

}