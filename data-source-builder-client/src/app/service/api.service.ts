import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  get(url : string){

  }

  post(url:string, model : any){
    return this.http.post(url, model);
  }
}
