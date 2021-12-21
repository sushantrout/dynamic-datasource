export class ConnectionModel{
    url: string;
    username: string;
    password: string;
    type: string;
    constructor(url : string, username: string, password: string, type:string){
        this.url = url;
        this.password = password;
        this.username = username;
        this.type = type;

    }
}