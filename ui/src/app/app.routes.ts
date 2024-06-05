import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard-container/dashboard-container.component').then(mod => mod.DashboardContainerComponent),
        children: [
             
            {    
                path : '',
                redirectTo: 'transactions',
                pathMatch : 'full'
            },
            {
                path: 'transactions',
                loadComponent: () => import('./pages/transactions-container/transactions-container.component').then(mod => mod.TransactionsContainerComponent)
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
    ,{
        path : '',
        redirectTo: 'dashboard',
        pathMatch : 'full'
    }
];
