import { Component, OnInit } from '@angular/core';
import { Options } from 'mat-table-exporter';
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
  
  constructor(private connectionService: ConnectionService, private columnMapperService: ColumnMpperService, private alertifyService: AlertifyService) { }
 
  fileData : Options = {
    
  };

  model: ConnectionModel = new ConnectionModel('', '', '', '', '');
  columnMapper: ColumnMapper = new ColumnMapper('', new ConnectionModel(), '', '');

  dataSources: ConnectionModel[] = [];
  tableList: any[] = [];
  columnList: any[] = [];
  columnValueList: any[] = [];
  selectedColumnList: any[] = [];
  tableHtmlColumnMapper: ColumnMapper[] = [];

  table_name: string = '';
  selectedColumnForHeader: string = '';
  old_column_name: string = '';

  isHeaderChanged: boolean = false;
  isRefreshedData: boolean = false;
  hasRequestTochangeHeader: boolean = false;


  ngOnInit(): void {
    this.model = new ConnectionModel('', '', '', '', '');
    this.columnMapper = new ColumnMapper('', new ConnectionModel(), '', '');
    this.tableList = [];
    this.columnList = [];
    this.columnValueList = [];
    this.selectedColumnList = [];
    this.getAllDataSources();
  }

  changeColumnHeader() {
    this.isHeaderChanged = true;
    let columnValueMap = new Map<String, String>();
    for (let colT of this.columnList) {
      let col = colT.column_name;
      if (col === this.old_column_name) {
        columnValueMap.set(col, this.selectedColumnForHeader);
      } else {
        if (this.tableHtmlColumnMapper && this.tableHtmlColumnMapper.length != 0 && this.tableHtmlColumnMapper[0].mapperdetails)
          columnValueMap.set(col, JSON.parse(this.tableHtmlColumnMapper[0].mapperdetails)[col]);
      }
    }
    let columnMapper = new ColumnMapper(0, this.model, this.table_name, columnValueMap);
    this.columnMapperService.createColumnMapper(columnMapper).subscribe((res: any) => {
      this.getHtmlHeaders();
    });
  }

  getHtmlHeaders() {
    this.columnMapperService.getColumnMapperByConnectionAndTable(this.model.dataSourceName + '', this.table_name).subscribe((res: any) => {
      this.tableHtmlColumnMapper = res;
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
  

  getTableDetails(tablename: string) {
    this.selectedColumnList = [];
    this.columnValueList = [];
    this.selectedColumnForHeader = '';
    this.hasRequestTochangeHeader = false;
    this.table_name = tablename;
    this.fileData = {
      fileName: tablename
    }
    this.connectionService.getTableInfo(tablename, this.model).subscribe((res: any) => {
      this.columnList = res;
      this.getHtmlHeaders();
    })
  }

  getColumnValue(): any {
    let element = '';
    this.selectedColumnList.forEach(e => element = element + "," + e);
    this.connectionService.getColumnValue(element, this.table_name, this.model).subscribe((res: any) => {
      this.columnValueList = res;
      this.selectedColumnList = Object.getOwnPropertyNames(res[0]);
    })
  }

  getTableData() {
    this.isRefreshedData = true;
  }

  getColumnHeader(column: any) {
    let headers = this.tableHtmlColumnMapper;
    if (headers && headers.length != 0 && headers[0]['mapperdetails']) {
      try {
        let header = JSON.parse(headers[0]['mapperdetails'])[column];
        if (header) {
          return header;
        }
      } catch (error) {

      }
    }
    return column;
  }

  reset() {
    this.model = new ConnectionModel('', '', '', '', '');
  }

  selectColumn(event: any) {
    let columnName = event.currentTarget.value;
    if(columnName && event.currentTarget.checked) {
      this.selectedColumnList.push(columnName);
    } else if(!event.currentTarget.checked) {
      this.selectedColumnList.pop();
    }
    var mySet = new Set(this.selectedColumnList);
    this.selectedColumnList = [...mySet];
  }

  selectColumnToChangeHeader(event: Event) {
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
