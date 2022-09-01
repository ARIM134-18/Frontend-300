import { ObrazovanjeService } from './service/obrazovanje.service';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { ObrazovanjeComponent } from './obrazovanje/obrazovanje.component';
import { SektorComponent } from './sektor/sektor.component';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { AuthorComponent } from './core/author/author.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ObrazovanjeDialogComponent } from './dialog/obrazovanje-dialog/obrazovanje-dialog.component';
import { PreduzeceComponent } from './preduzece/preduzece.component';
import { PreduzeceDialogComponent } from './dialog/preduzece-dialog/preduzece-dialog.component';
import { PreduzeceService } from './service/preduzece.service';

import { SektorService } from './service/sektor.service';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SektorDialogComponent } from './dialog/sektor-dialog/sektor-dialog.component';
import { RadnikComponent } from './radnik/radnik.component';
import { RadnikDialogComponent } from './dialog/radnik-dialog/radnik-dialog.component';
import { RadnikService } from './service/radnik.service';

//RUTIRANJE se vrsi u odvojenom modulu (app-routing module ts) a mi taj modul importujemo ovde
const Routes = [ //rute na koje vodi URL zahtev sa web-a npr. lh4200/obrazovanje na obrazovanje // ovde definisemo sve rute na nivaou nase klase
  { path: 'obrazovanje', component: ObrazovanjeComponent},
  { path: 'preduzece', component: PreduzeceComponent },
  { path: 'sektor', component: SektorComponent },
  { path: 'radnik', component: RadnikComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'author', component: AuthorComponent },
  { path: '',   redirectTo: '/home', pathMatch: "full" }, //ako je prazna putanja stavljamo da vodi na home, full sprecava beskonacno trazenje prazne putanje
 ];

@NgModule({
  declarations: [ //niz svih komponenti koje ce biti definisane na nivou angular aplikacije
    AppComponent,
    ObrazovanjeComponent,
    PreduzeceComponent,
    SektorComponent,
    RadnikComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    ObrazovanjeDialogComponent,
    PreduzeceDialogComponent,
    SektorDialogComponent,
    RadnikDialogComponent
  ],
  imports: [ //ovde importujemo rout modul //svako modul koji ovde bude definisan, mocice da se koristi bilo gde u nasoj aplikaciji
    BrowserModule,
    MatSidenavModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [ObrazovanjeService, PreduzeceService, SektorService, RadnikService], //ovo se tice dependency injection -- ovde mozemo da definisemo tokene za svaku klasu koju zelimo da imamo u providers nizu i da istu instancu injektujemo u bilo koju klasu koju zelimo -- mi koristimo samo servisne klase pa nam ovo ne treba
                                                                  //da bi radio injectable iz servisnih komponenti 
  bootstrap: [AppComponent] //definisemo koje to sve komponente bootstrapuju(ucitavaju) kada se ucita nas modul
})
export class AppModule { }
