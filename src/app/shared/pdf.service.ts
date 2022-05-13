import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pdf } from './pdf';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(public _http: HttpClient) {}
  getAlldata(): Observable<Pdf[]> {
    return this._http.get<Pdf[]>('http://localhost:3000/' + 'Product');
  }
}
