import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/core/models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.url_api}/categories`);
  }

  createCategory(data: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(`${environment.url_api}/categories`, data);
  }

  updateCategory(id: string, data: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${environment.url_api}/categories/${id}`, data);
  }

  checkCategoryName(name: string) {
    return this.http.post(`${environment.url_api}/categories/availability`, name);
  }
}
