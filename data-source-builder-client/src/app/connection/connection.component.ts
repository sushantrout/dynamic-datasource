import { Component, OnInit } from '@angular/core';
import { ConnectionModel } from '../model/connection.model';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  model : ConnectionModel = new ConnectionModel('', '', '', '');
  constructor() { }

  ngOnInit(): void {
    this.model = new ConnectionModel('', '', '', '');
  }

}
