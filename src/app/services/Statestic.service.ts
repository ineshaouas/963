import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Statusers } from '../model/stat/Statusers';
import { Statfacturation } from '../model/stat/Statfacturation';
import { Statplanification } from '../model/stat/Statplanification';
import { Statvegicules } from '../model/stat/Statvegicules';
import { ListStatvegicules } from '../model/stat/ListStatvegicules';


@Injectable({
  providedIn: 'root'
})
export class statesticservice {

  private statUrl = "https://localhost:7102/";

  constructor(
    private http: HttpClient
  ) { }


  statusers(): Observable<Statusers[]> {
    return this.http.get<Statusers[]>(this.statUrl + "statusers");
  }
  statvegicules(): Observable<ListStatvegicules> {
    return this.http.get<ListStatvegicules>(this.statUrl + "statvegicules");
  }
  statplanification(): Observable<Statplanification[]> {
    return this.http.get<Statplanification[]>(this.statUrl + "statplanification");
  }
  statfacturation(): Observable<Statfacturation[]> {
    return this.http.get<Statfacturation[]>(this.statUrl + "statfacturation");
  }
}
