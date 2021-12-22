import { Component, OnInit } from '@angular/core';
import { ConnectionModel } from '../model/connection.model';
import { AlertifyService } from '../service/alertify.service';
import { ConnectionService } from '../service/connection.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  model : ConnectionModel = new ConnectionModel('', '', '', '');
  constructor(private connectionService : ConnectionService, private alertifyService : AlertifyService) { }

  tableList : any[] = [];
  columnList : any[] = [];
  column_name : string = '';
  table_name : string = '';
  old_column_name : string = '';

  ngOnInit(): void {
    this.model = new ConnectionModel('', '', '', '');
    this.tableList = [];
    this.columnList = [];
    this.old_column_name = '';
  }

  testConnection(){
    this.connectionService.getConnection(this.model).subscribe((res: any) => {
      this.tableList = res;
      this.columnList = [];
    });
  }

  getTableDetails(tablename: string){
    this.table_name = tablename;
    this.connectionService.getTableInfo(tablename, this.model).subscribe((res : any) => {
      this.columnList = res;
    })
  }

  reset(){
    this.model = new ConnectionModel('', '', '', '');
  }

  getColumnName(event : Event) : any {
    this.column_name = (event.target as HTMLInputElement).value;
    this.old_column_name = this.column_name;
    console.log('Old column name: ' +(event.target as HTMLInputElement).value);
  }

  changeColumnName() {
    this.connectionService.updateColumnName(this.old_column_name, this.column_name, this.table_name, this.model).subscribe((res : any) => {
       console.log('column name ' +this.column_name);
       console.log('Res ' +res);
       if(res == null) {
          this.alertifyService.success('Successfully updated');
       }
       this.getTableDetails(this.table_name);
    })
  }
}
