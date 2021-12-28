import { ConnectionModel } from "./connection.model";

export class ColumnMapper{
    id?: any
    connection?: ConnectionModel;
    tablename?: string;
    mapperdetails?: any;

    constructor(id?: any, connection ?: ConnectionModel, tablename?: string, mapperdetails?: any){
        this.id = id;
        this.connection = connection;
        this.tablename = tablename;
        this.mapperdetails = mapperdetails;
    }
}