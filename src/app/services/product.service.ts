import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProductsByStoreId(storeId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products?storeId=${storeId}`);
  }

  updateProduct(id: number, productData: Product): Observable<any> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, productData);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }
}
