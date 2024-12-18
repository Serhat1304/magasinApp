import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../models/category.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiUrl = 'http://localhost:3000/categories';


  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }
}
