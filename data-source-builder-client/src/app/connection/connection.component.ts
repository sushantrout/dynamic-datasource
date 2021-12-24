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

  model : ConnectionModel = new ConnectionModel('', '', '', '', '');
  constructor(private connectionService : ConnectionService, private alertifyService : AlertifyService) { }

  dataSources: ConnectionModel[] = [];
  tableList : any[] = [];
  columnList : any[] = [];
  columnValueList : any[] = [];
  selectedColumnList: any[] = [];

  table_name : string = '';
  selectedColumnForHeader : string = '';
  old_column_name : string = '';

  isHeaderChanged : boolean = false;
  isRefreshedData : boolean = false;
  hasRequestTochangeHeader : boolean = false;

  ngOnInit(): void {
    this.model = new ConnectionModel('', '', '', '', '');
    this.tableList = [];
    this.columnList = [];
    this.columnValueList = [];
    this.selectedColumnList = [];
    this.getAllDataSources();
  }

  changeColumnHeader() {
    this.isHeaderChanged = true;
    this.connectionService.updateColumnName(this.old_column_name, this.selectedColumnForHeader, this.table_name, this.model).subscribe((res : any) => {
      console.log('column name ' +this.selectedColumnForHeader);
      if(res == null) {
         this.alertifyService.success('Successfully Header Changed');
      }
      this.getTableDetails(this.table_name);
      console.log('Selected column list: ' +this.selectedColumnList);
   })
  }

  getAllDataSources() {
    this.connectionService.getAllConnectionDetails().subscribe((res: any) => {
      this.dataSources = res;
    });
  }

  getDataSourceTables(event: any) {
    this.connectionService.getConnectionByDataSourceName(event.target.value).subscribe((res: any) => {
      this.model = res;
    });
  }

  getTableDetails(tablename: string)  {
    this.selectedColumnList = [];
    this.columnValueList = [];
    this.table_name = tablename;
    this.connectionService.getTableInfo(tablename, this.model).subscribe((res : any) => {
      this.columnList = res;
    })
  }

  getColumnValue() : any {
    let element = '';
    this.selectedColumnList.forEach(e => element = element + "," + e);
    console.log('Selected column after load: ' +this.selectedColumnList)
    this.connectionService.getColumnValue(element, this.table_name, this.model).subscribe((res : any) => {
    this.columnValueList = res;
    this.selectedColumnList = Object.getOwnPropertyNames(res[0]);
    })
  }

  getTableData() {
    this.isRefreshedData = true;
    // this.connectionService.getAllColumnsWithValues(this.table_name, this.model).subscribe((res : any) => {
    //   console.log('result after refresh: ' +res);
    // })
    //this.getTableDetails(this.table_name);
  }

  reset() {
    this.model = new ConnectionModel('', '', '', '', '');
  }

  selectColumn(event : any) {
    let columnName = event.currentTarget.value;
    this.selectedColumnList.push(columnName);
    console.log('Selected columns: ' +this.selectedColumnList);
  }

  selectColumnToChangeHeader(event : Event) {
    this.selectedColumnForHeader = (event.target as HTMLInputElement).value;
    this.old_column_name = this.selectedColumnForHeader;
    this.hasRequestTochangeHeader = true;
  }

  testConnection() {
    this.connectionService.getConnection(this.model).subscribe((res: any) => {
      this.tableList = res;
      this.columnList = [];
    });
    this.getAllDataSources();
  }

}
