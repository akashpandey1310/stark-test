import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://reqres.in/api/users'

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor(private http: HttpClient) { }

  create(data:any):Observable<any> {
    return this.http.post(baseUrl , data)
  }

  getAll():Observable<any> {
    return this.http.get(baseUrl)
  }

  get(id:any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  delete(id:any):Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data)
  }

  getToken() {
    return 'xyzabcpqr'
  }

}


