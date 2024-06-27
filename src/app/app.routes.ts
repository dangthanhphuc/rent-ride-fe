import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: '', redirectTo: '/homepage', pathMatch: 'full'},
    {path: "homepage", component: HomepageComponent},

    {path: "**", component: PageNotFoundComponent}
];
