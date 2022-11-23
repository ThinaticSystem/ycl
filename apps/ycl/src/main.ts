import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';

const mainRoutes: Routes = [
  { path: 'futomomo', loadComponent: () => import('./app/pages/futomomo/futomomo.component') },
];

const routes = [...mainRoutes];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
