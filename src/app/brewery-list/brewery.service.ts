import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Brewery } from '../interfaces/brewery';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreweryService {

  HREF = 'https://api.openbrewerydb.org/breweries'

  constructor(private http: HttpClient) { }

  loadBreweries(): Observable<Brewery[]> {
    return this.http.get<any[]>(this.HREF)
      .pipe(map(breweries => breweries.map(
        ({brewery_type: type, postal_code: postal, website_url: website, ...rest}) => ({
          ...rest,
          type,
          postal,
          website,
        })
      )));
  }

}
