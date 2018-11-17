import { ApicallService } from './apicall.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DataShareService } from './datashare.service';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StandingsComponent } from './standings/standings.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'standings', component: StandingsComponent },
  { path: '',redirectTo: 'home' , pathMatch:'full' },

]

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    TeamsComponent,
    StandingsComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,    
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataShareService, ApicallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
