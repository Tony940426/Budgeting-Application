import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/budget/budget-page.component').then((m) => m.BudgetPageComponent),
  },
  { path: '**', redirectTo: '' },
];
