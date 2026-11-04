import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Class, Subclass, Species, Subspecies, ClassFeature, SpeciesFeature,
  CharacterListing, CharacterRecord, Background, CharacterPayload, CharacterDetail
} from "../models/models"

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api';
  /*
  private apiUrlClass = 'http://localhost:3000/api/class';
  private apiUrlSpecies = 'http://localhost:3000/api/species';
  private apiUrlSubspecies = 'http://localhost:3000/api/subspecies';
  private apiUrlSubclass = 'http://localhost:3000/api/subclass';
  private apiUrlBackgrounds = 'http://localhost:3000/api/background';

  private apiUrlSubclassCleric = 'http://localhost:3000/api/subclass/3';
  private apiUrlLifeCleric = 'http://localhost:3000/api/class_features/3/6';
  private apiUrlCharacterListing = 'http://localhost:3000/api/character';
  private apiUrlCharacterRecord = 'http://localhost:3000/api/character/';

  */
  header = {};

  constructor(private http: HttpClient) {
    let token = localStorage.getItem("id_token")
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization', `Basic ${token}`)
    }
  }


  getUsername() {
    return this.http.get<string>(`${this.apiUrl}/username`, this.header);
  }

  


  postCharacter(payload: CharacterPayload) {
    return this.http.post<CharacterPayload>(`${this.apiUrl}/character`, payload, this.header);
  }

  


  putCharacterData(data: any, row_id: number) {
    return this.http.put<any>(`${this.apiUrl}/character/data/${row_id}`, data, this.header);
  }

  

  getBackgrounds(): Observable<Background[]> {
    return this.http.get<Background[]>(`${this.apiUrl}/background`, this.header);
  }
  

  

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.apiUrl}/class`, this.header);
  }
  
  

  getAllSubclasses(): Observable<Subclass[]> {
    return this.http.get<Subclass[]>(`${this.apiUrl}/subclass`, this.header);
  }

  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.apiUrl}/species`, this.header);
  }


  getAllSubspecies(): Observable<Subspecies[]> {
    return this.http.get<Subspecies[]>(`${this.apiUrl}/subspecies`, this.header);
  }


  getSubclasses(class_row_id?: number): Observable<Subclass[]> {
    return this.http.get<Subclass[]>(`${this.apiUrl}/subclass/${class_row_id}`, this.header);
  }


  getClassFeatures(class_row_id: number, level: number, subclass_row_id?: number): Observable<ClassFeature[]> {
    return this.http.get<ClassFeature[]>(`${this.apiUrl}/class_features/${class_row_id}/${subclass_row_id}/${level}`, this.header);
  }


  getLevelOneClassFeatures(class_row_id: number, subclass_row_id?: number): Observable<ClassFeature[]> {
    return this.http.get<ClassFeature[]>(`${this.apiUrl}/class_features/${class_row_id}/${subclass_row_id}`, this.header);
  }

  getSpeciesFeatures(species_row_id: number, subspecies_row_id?: number): Observable<SpeciesFeature[]> {
    return this.http.get<SpeciesFeature[]>(`${this.apiUrl}/species_features/${species_row_id}/${subspecies_row_id}`, this.header);
  }


  getCharacterListing(): Observable<CharacterListing[]> {
    return this.http.get<CharacterListing[]>(`${this.apiUrl}/character`, this.header);
  }
  getCharacterRecord(row_id: number): Observable<CharacterDetail> {
    return this.http.get<CharacterDetail>(`${this.apiUrl}/character/${row_id}`, this.header);
  }
}
