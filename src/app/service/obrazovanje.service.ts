import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable'; //tok podataka koje emituje kad se pretplatimo na na njega i da ih izvlacimo
import { Obrazovanje } from '../model/obrazovanje.model';

//MEDJUSLOJ za komunikaciju komponenti frontend-a i backend-a

@Injectable() //DI za injektovanje potrebnih zavisnosti
export class ObrazovanjeService {
  private readonly API_URL = 'http://localhost:8082/obrazovanje/'; //putanja sa koje uzima podatke

  dataChange: BehaviorSubject<Obrazovanje[]> = new BehaviorSubject<Obrazovanje[]>([]);

  constructor(private httpClient: HttpClient) {} //daje mogucnost da saljemo http zahtev ka serveru

  //CRUD OPERACIJE

  public getAllObrazovanje(): Observable<Obrazovanje[]> { //poziva get all iz getmapping-a springa iz rest kontrolera
    this.httpClient.get<Obrazovanje[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message); //ovo sam mogao i u implementaciji metode u okviru komponente
      }
    );
    return this.dataChange.asObservable(); //vraca podatke kao observable
  }

  public addObrazovanje(obrazovanje: Obrazovanje): void {
    this.httpClient.post(this.API_URL, obrazovanje).subscribe();
  }

  public updateObrazovanje(obrazovanje: Obrazovanje): void {
    this.httpClient.put(this.API_URL, obrazovanje).subscribe();
  }

  public deleteObrazovanje(id: number): void { // i u backendu trazimo id za brisanje
    this.httpClient.delete(this.API_URL + id).subscribe();
  }
}
