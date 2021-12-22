import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "./api.service";
import { ConnectionModel } from "../model/connection.model";

@Injectable({
  providedIn: "root",
})
export class ConnectionService {
  baseURL = "connection";
  constructor(private api: ApiService) {}

  getConnection(model : ConnectionModel){
    return this.api.post(this.baseURL, model);
  }

  getTableInfo(tablename : string, model : ConnectionModel) {
    return this.api.post(`${this.baseURL}/${tablename}`, model);
  }

  updateColumnName(oldcolumnname : string, columnname : string, tablename : string, model : ConnectionModel) {
    return this.api.post(`${this.baseURL}/${oldcolumnname}/${columnname}/${tablename}`, model);
  }

}
