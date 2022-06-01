import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pdf } from './pdf.model';
import { Product } from './product.model';
// import { Observable } from 'rxjs';
// import { Pdf } from './pdf.model';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  apiUrl: 'http://localhost:3000/posts';
  constructor(public _http: HttpClient) {}

  getAlldata(): Observable<Product[]> {
    return this._http.get<[Product]>(this.apiUrl);
  }
}
