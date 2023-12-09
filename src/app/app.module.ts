import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './features/pages/home/home.component';
import { DetailsComponent } from './features/pages/details/details.component';
import { ConverterComponent } from './features/components/converter/converter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartComponent } from './features/components/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DetailsComponent,
    ConverterComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
