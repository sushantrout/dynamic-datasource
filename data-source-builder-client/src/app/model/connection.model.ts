export class ConnectionModel{
    dataSourceName: string
    url: string;
    username: string;
    password: string;
    type: string;
    constructor(dataSourceName: string, url : string, username: string, password: string, type:string){
        this.dataSourceName = dataSourceName;
        this.url = url;
        this.password = password;
        this.username = username;
        this.type = type;
    }
}