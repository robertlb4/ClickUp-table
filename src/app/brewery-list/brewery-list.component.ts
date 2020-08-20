import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'brewery-list',
  templateUrl: './brewery-list.component.html',
  styleUrls: ['./brewery-list.component.scss']
})
export class BreweryListComponent implements OnInit {

  columns = [
    "Name",
    "Type",
    "State",
    "Website",
  ];
  breweries$ = this.http.get<any[]>('assets/data.json');

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void { 
    
  }



}
