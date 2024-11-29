import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProductsByStoreId(storeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products?storeId=${storeId}`);
  }
}