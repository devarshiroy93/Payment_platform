import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/home-container/home-container.component').then(mod => mod.HomeContainerComponent),
        children: [

            {
                path: '',
                redirectTo: 'advert',
                pathMatch: 'full'
            },
            {
                path: 'transactions',
                loadComponent: () => import('./pages/transactions-container/transactions-container.component').then(mod => mod.TransactionsContainerComponent),
                canActivate : [AuthGuard]
            },
            {
                path: 'advert',
                loadComponent: () => import('./pages/advertisement/advertisement.component').then(m => m.AdvertisementComponent)
            },
            {
                path: 'add-money',
                loadComponent: () => import('./pages/add-money/add-money.component').then(m => m.AddMoneyComponent)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login-container/login-container.component').then(mod => mod.LoginContainerComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register-container/register-container.component').then(mod => mod.RegisterContainerComponent)
    }
    , {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];
