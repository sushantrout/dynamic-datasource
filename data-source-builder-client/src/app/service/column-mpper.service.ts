import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnMapper } from '../model/columnmapper.model';
import { ConnectionModel } from '../model/connection.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnMpperService {
  baseURL = "columnmap";

  constructor(private apiService : ApiService) { }

  createColumnMapper(columnmapper : ColumnMapper) : Observable<ColumnMapper>{
    let obj:any = {};
    columnmapper.mapperdetails.forEach((value:string , key:string) => {
      obj[key] = value;
    });
    columnmapper.mapperdetails = JSON.stringify(obj);
    return this.apiService.post(this.baseURL, columnmapper);
  }

  getColumnById(id : Number) {
    this.apiService.get(`${this.baseURL}/${id}`);
  }

  getColumnMapperByConnectionAndTable(connection : string, tablename : string) : Observable<ColumnMapper> {
    return this.apiService.get(`${this.baseURL}/${connection}/${tablename}`);
  }

}
