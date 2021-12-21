import { Component, OnInit } from '@angular/core';
import { ConnectionModel } from '../model/connection.model';
import { ConnectionService } from '../service/connection.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  model : ConnectionModel = new ConnectionModel('', '', '', '');
  constructor(private connectionService : ConnectionService) { }

  tableList : any[] = [];
  ngOnInit(): void {
    this.model = new ConnectionModel('', '', '', '');
  }

  testConnection(){
    this.connectionService.getConnection(this.model).subscribe((res: any) => {
      this.tableList = res;
    });
  }
  getTableDetails(tablename: string){
    console.log(tablename);
  }
  reset(){
    this.model = new ConnectionModel('', '', '', '');
  }
}
