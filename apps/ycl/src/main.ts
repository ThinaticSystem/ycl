import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path: 'futomomo', loadComponent: () => import('./app/pages/futomomo/futomomo.component') },

  { path: 'poster', loadComponent: () => import('./app/parts/poster/poster.component') },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
