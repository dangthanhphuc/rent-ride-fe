import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AccountComponent } from './components/account/account.component';
import { FilterComponent } from './components/filter/filter.component';
import { ResetpwComponent } from './components/account/resetpw/resetpw.component';
import { TripsComponent } from './components/account/trips/trips.component';
import { AddressComponent } from './components/account/address/address.component';
import { CarsComponent } from './components/account/cars/cars.component';
import { FavsComponent } from './components/account/favs/favs.component';
import { InforComponent } from './components/account/infor/infor.component';

export const routes: Routes = [
    {path: '', redirectTo: '/homepage', pathMatch: 'full'},
    
    {path: "homepage", component: HomepageComponent},

    {path: "account", component: AccountComponent, children: [
        {path: "resetpw" , component: ResetpwComponent},
        {path: "trips", component: TripsComponent},
        {path: "address", component: AddressComponent},
        {path: "cars", component: CarsComponent},
        {path: "favs", component: FavsComponent},
        {path: "infor", component: InforComponent},
    ]},
    {path: "filter", component : FilterComponent},

    {path: "**", component: PageNotFoundComponent}
];
// 