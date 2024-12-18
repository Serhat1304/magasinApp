import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProductsByStoreId(storeId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}?storeId=${storeId}`);
  }

  updateProduct(id: number, productData: Product): Observable<any> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, productData);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, product);
  }
}
