import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class, Subclass, ClassFeature, CharacterListing, CharacterRecord } from "../models/models"

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/class';
  private apiUrlSubclass = 'http://localhost:3000/api/subclass';
  private apiUrlSubclassCleric = 'http://localhost:3000/api/subclass/3';
  private apiUrlLifeCleric = 'http://localhost:3000/api/class_features/3/6';
  private apiUrlCharacterListing = 'http://localhost:3000/api/character';
  private apiUrlCharacterRecord = 'http://localhost:3000/api/character/';
  header = {};

  constructor(private http: HttpClient) {
    let token = localStorage.getItem("id_token")
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${token}`)
    }
  }

  

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.apiUrl, this.header);
  }
  getSubclasses(): Observable<Subclass[]> {
    return this.http.get<Subclass[]>(this.apiUrlSubclass, this.header);
  }
  getClericSubclasses(): Observable<Subclass[]> {
    return this.http.get<Subclass[]>(this.apiUrlSubclassCleric, this.header);
  }
  getLifeCleric(): Observable<ClassFeature[]> {
    return this.http.get<ClassFeature[]>(this.apiUrlLifeCleric, this.header);
  }
  getCharacterListing(): Observable<CharacterListing[]> {
    return this.http.get<CharacterListing[]>(this.apiUrlCharacterListing, this.header);
  }
  getCharacterRecord(row_id: number): Observable<CharacterRecord> {
    return this.http.get<CharacterRecord>(this.apiUrlCharacterRecord + row_id, this.header);
  }
}
