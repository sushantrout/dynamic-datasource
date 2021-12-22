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
  columnList : any[] = [];
  ngOnInit(): void {
    this.model = new ConnectionModel('', '', '', '');
    this.tableList = [];
    this.columnList = [];
  }

  testConnection(){
    this.connectionService.getConnection(this.model).subscribe((res: any) => {
      this.tableList = res;
      this.columnList = [];
    });
  }

  getTableDetails(tablename: string){
    this.connectionService.getTableInfo(tablename, this.model).subscribe((res : any) => {
      this.columnList = res;
    })
  }

  reset(){
    this.model = new ConnectionModel('', '', '', '');
  }
}
