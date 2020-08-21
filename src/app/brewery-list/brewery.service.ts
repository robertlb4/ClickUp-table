import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BreweryService {

  breweries$ = this.http.get<any[]>('https://api.openbrewerydb.org/breweries');

  constructor(private http: HttpClient) { }
}
