import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Preduzece } from '../model/preduzece.model';

@Injectable()
export class PreduzeceService {
  private readonly API_URL = 'http://localhost:8082/preduzece/';

  dataChange: BehaviorSubject<Preduzece[]> = new BehaviorSubject<Preduzece[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllPreduzece(): Observable<Preduzece[]> {
    this.httpClient.get<Preduzece[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }

  public addPreduzece(preduzece: Preduzece): void {
    this.httpClient.post(this.API_URL, preduzece).subscribe();
  }

  public updatePreduzece(preduzece: Preduzece): void {
    this.httpClient.put(this.API_URL, preduzece).subscribe();
  }

  public deletePreduzece(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }
}
