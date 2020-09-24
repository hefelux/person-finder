import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ENV from '../../environments/environment.commons';

@Injectable({
  providedIn: 'root'
})

export class RegionService {

  constructor(private http: HttpClient) { }

  getAllRegions(): Observable<any> {
    return this.http.get(ENV.API_URL_SERVICE + 'region');
  }

}
