import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConnectionModel } from '../model/connection.model';

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

  getHeader(){
    const httpHeaders = new HttpHeaders().set('Content-Type', 'application/Json');
    let options = {headers :httpHeaders};
    return options;
  }
}
