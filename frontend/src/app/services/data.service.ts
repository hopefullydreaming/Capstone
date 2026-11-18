import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Class, Subclass, Species, Subspecies, ClassFeature, SpeciesFeature, Source,
  CharacterListing, CharacterRecord, Background, CharacterPayload, CharacterDetail
} from "../models/models"

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/api`;

  private http = inject(HttpClient)

  getUsername() {
    return this.http.get<string>(`${this.apiUrl}/username`);
  }


  postCharacter(payload: CharacterPayload) {
    return this.http.post<CharacterPayload>(`${this.apiUrl}/character`, payload);
  }


  deleteCharacter(row_id: number) {
    return this.http.delete<any>(`${this.apiUrl}/character/${row_id}`);
  }


  putCharacterData(data: any, row_id: number) {
    return this.http.put<any>(`${this.apiUrl}/character/data/${row_id}`, data);
  }

  

  getBackgrounds(): Observable<Background[]> {
    return this.http.get<Background[]>(`${this.apiUrl}/background`);
  }
  

  

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.apiUrl}/class`);
  }
  

  getSources(): Observable<Source[]> {
    return this.http.get<Source[]>(`${this.apiUrl}/sources`);
  }
  
  

  getAllSubclasses(): Observable<Subclass[]> {
    return this.http.get<Subclass[]>(`${this.apiUrl}/subclass`);
  }

  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.apiUrl}/species`);
  }


  getAllSubspecies(): Observable<Subspecies[]> {
    return this.http.get<Subspecies[]>(`${this.apiUrl}/subspecies`);
  }

  getClassFeatures(class_row_id: number, level: number, subclass_row_id?: number): Observable<ClassFeature[]> {
    return this.http.get<ClassFeature[]>(`${this.apiUrl}/class_features/${class_row_id}/${subclass_row_id}/${level}`);
  }


  getSpeciesFeatures(species_row_id: number, subspecies_row_id?: number): Observable<SpeciesFeature[]> {
    return this.http.get<SpeciesFeature[]>(`${this.apiUrl}/species_features/${species_row_id}/${subspecies_row_id}`);
  }


  getCharacterListing(): Observable<CharacterListing[]> {
    return this.http.get<CharacterListing[]>(`${this.apiUrl}/character`);
  }
  getCharacterRecord(row_id: number): Observable<CharacterDetail> {
    return this.http.get<CharacterDetail>(`${this.apiUrl}/character/${row_id}`);
  }

}
