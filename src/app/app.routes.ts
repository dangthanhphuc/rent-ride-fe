import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AccountComponent } from './components/account/account.component';
import { FilterComponent } from './components/filter/filter.component';
import { ResetpwComponent } from './components/account/resetpw/resetpw.component';

export const routes: Routes = [
    {path: '', redirectTo: '/homepage', pathMatch: 'full'},
    
    {path: "homepage", component: HomepageComponent},

    {path: "account", component: AccountComponent, children: [
        {path: "resetpw" , component: ResetpwComponent}
    ]},
    {path: "filter", component : FilterComponent},

    {path: "**", component: PageNotFoundComponent}
];
// 