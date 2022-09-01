import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Sektor } from '../model/sektor.model';

@Injectable()
export class SektorService {
  private readonly API_URL = 'http://localhost:8082/sektor/';

  dataChange: BehaviorSubject<Sektor[]> = new BehaviorSubject<Sektor[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllSektor(): Observable<Sektor[]> {
    this.httpClient.get<Sektor[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }

  public addSektor(sektor: Sektor): void {
    this.httpClient.post(this.API_URL, sektor).subscribe();
  }

  public updateSektor(sektor: Sektor): void {
    this.httpClient.put(this.API_URL, sektor).subscribe();
  }

  public deleteSektor(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }
}
