import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FilterComponent } from './components/filter/filter.component';

export const routes: Routes = [
    {path: '', redirectTo: '/homepage', pathMatch: 'full'},
    
    {path: "homepage", component: HomepageComponent},
    {path: "filter", component : FilterComponent},

    {path: "**", component: PageNotFoundComponent}
];
