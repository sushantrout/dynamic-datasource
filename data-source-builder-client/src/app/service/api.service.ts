import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  get(url : string){

  }

  post(url:string, model : any){
    return this.http.post(`${environment.apiUrl+url}`, model);
  }
}
