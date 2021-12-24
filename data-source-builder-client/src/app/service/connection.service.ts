import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "./api.service";
import { ConnectionModel } from "../model/connection.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConnectionService {
  baseURL = "connection";
  constructor(private api: ApiService) {}

  getConnection(model : ConnectionModel){
    return this.api.put(this.baseURL, model);
  }

  getTableInfo(tablename : string, model : ConnectionModel) {
    return this.api.post(`${this.baseURL}/${tablename}`, model);
  }

  getAllConnectionDetails(){
    return this.api.get(this.baseURL);
  }

  getConnectionByDataSourceName(dataSourceName: string){
    console.log('data:',dataSourceName)
    return this.api.get(`${this.baseURL}/${dataSourceName}`);
  }

  getColumnValue(columnname : any, tablename : string, model : ConnectionModel) : Observable<any>{
    return this.api.post(`${this.baseURL}/${columnname}/${tablename}`, model);
  }

  // getAllColumnsWithValues(tablename : string, model : ConnectionModel) {
  //   return this.api.post(`${this.baseURL}/"column"/${tablename}`, model)
  // }

  updateColumnName(oldcolumnname : string, columnname : string, tablename : string, model : ConnectionModel) {
    return this.api.post(`${this.baseURL}/${oldcolumnname}/${columnname}/${tablename}`, model);
  }

}
