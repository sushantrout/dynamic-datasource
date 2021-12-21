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
}