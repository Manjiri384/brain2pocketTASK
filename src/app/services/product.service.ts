import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'assets/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<[]>(this.apiUrl);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(products => products.find(product => product.id === id))
    );
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(products => products.filter(product => product.category === category))
    );
  }

  
}

