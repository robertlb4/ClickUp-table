import { Component, OnInit } from '@angular/core';
import { BreweryService } from './brewery.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'brewery-list',
  templateUrl: './brewery-list.component.html',
  styleUrls: ['./brewery-list.component.scss'],
  providers: [BreweryService]
})
export class BreweryListComponent implements OnInit {

  columns = [
    "Name",
    "Type",
    "State",
    "Website",
  ];
  breweries$: Observable<any[]>;

  constructor(private breweryService: BreweryService) { }

  ngOnInit(): void { 
    this.breweries$ = this.breweryService.breweries$;
  }



}
