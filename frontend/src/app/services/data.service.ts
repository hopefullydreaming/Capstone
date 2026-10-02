import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private apiUrlCharacterRecord = 'http://localhost:3000/api/character/15';

  constructor(private http: HttpClient) {}

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.apiUrl);
  }
  getSubclasses(): Observable<Subclass[]> {
    return this.http.get<Subclass[]>(this.apiUrlSubclass);
  }
  getClericSubclasses(): Observable<Subclass[]> {
    return this.http.get<Subclass[]>(this.apiUrlSubclassCleric);
  }
  getLifeCleric(): Observable<ClassFeature[]> {
    return this.http.get<ClassFeature[]>(this.apiUrlLifeCleric);
  }
  getCharacterListing(): Observable<CharacterListing[]> {
    return this.http.get<CharacterListing[]>(this.apiUrlCharacterListing);
  }
  getCharacterRecord(): Observable<CharacterRecord> {
    return this.http.get<CharacterRecord>(this.apiUrlCharacterRecord);
  }
}
