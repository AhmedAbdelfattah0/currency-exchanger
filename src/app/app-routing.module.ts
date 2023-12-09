import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { DetailsComponent } from './features/pages/details/details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'details/:from/:to', component: DetailsComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
