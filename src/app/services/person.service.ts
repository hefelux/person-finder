import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ENV from '../../environments/environment.commons';

@Injectable({
  providedIn: 'root'
})

export class PersonService {

  constructor(private http: HttpClient) { }

  getAllPersons(): Observable<any> {
    return this.http.get(ENV.API_URL_SERVICE + 'persona');
  }

}
