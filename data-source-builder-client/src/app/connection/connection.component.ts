import { Component, OnInit } from '@angular/core';
import { ColumnMapper } from '../model/columnmapper.model';
import { ConnectionModel } from '../model/connection.model';
import { AlertifyService } from '../service/alertify.service';
import { ColumnMpperService } from '../service/column-mpper.service';
import { ConnectionService } from '../service/connection.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  model : ConnectionModel = new ConnectionModel('', '', '', '', '');
  columnMapper : ColumnMapper = new ColumnMapper('', '', '', '');
  constructor(private connectionService : ConnectionService, private columnMapperService : ColumnMpperService, private alertifyService : AlertifyService) { }

  dataSources: ConnectionModel[] = [];
  tableList : any[] = [];
  columnList : any[] = [];
  columnValueList : any[] = [];
  selectedColumnList : any[] = [];
  tableHtmlColumnMapper : any [] = [];

  table_name : string = '';
  selectedColumnForHeader : string = '';
  old_column_name : string = '';

  isHeaderChanged : boolean = false;
  isRefreshedData : boolean = false;
  hasRequestTochangeHeader : boolean = false;

  
  ngOnInit(): void {
    this.model = new ConnectionModel('', '', '', '', '');
    this.columnMapper = new ColumnMapper('', '', '', '');
    this.tableList = [];
    this.columnList = [];
    this.columnValueList = [];
    this.selectedColumnList = [];
    this.getAllDataSources();
    // let item1 = {
    //   'empid':'Employee Id',
    // }
    // let item2={
    //   'first_name': 'First Name'
    // }
    // this.tableHtmlColumnMapper.push(item1);
    // this.tableHtmlColumnMapper.push(item2);
    
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

  getHtmlHeaders() {
    this.columnMapperService.getColumnMapperByConnectionAndTable(this.model.dataSourceName, this.table_name).subscribe((res : any) => {
      this.tableHtmlColumnMapper = res;
      console.log('Column Mapper: ' +res);
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
    this.selectedColumnForHeader = '';
    this.hasRequestTochangeHeader = false; 
    this.table_name = tablename;
    this.connectionService.getTableInfo(tablename, this.model).subscribe((res : any) => {
      this.columnList = res;
    })
    this.saveColumnMapper();
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
  }

  getColumnHeader(column:any){
    for(let item of this.tableHtmlColumnMapper){
      if(item[column]){
        return item[column];
      }
    }
    return column;
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

  saveColumnMapper() {
    if(this.columnList) {
      let columnMap : Map<string, string>  = new Map<string, string> ();
      console.log('Column List: ' +this.columnList);
      for(let col of this.columnList) {
        columnMap.set(col.column_name, col.column_name);
      }
      this.columnMapper = new ColumnMapper('', this.model.dataSourceName, this.table_name, columnMap);
      this.columnMapperService.createColumnMapper(this.columnMapper).subscribe((res : any) => {
        console.log('Column Mapper  saved: ' +res);
      })
    }
  }

  testConnection() {
    this.connectionService.getConnection(this.model).subscribe((res: any) => {
      this.tableList = res;
      this.columnList = [];
    });
    this.getAllDataSources();
   
  }

}
