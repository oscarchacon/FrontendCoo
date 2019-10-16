import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loading-table',
  templateUrl: './loading-table.component.html',
  styleUrls: ['./loading-table.component.css']
})
export class LoadingTableComponent implements OnInit {

  @Input() whiteColor: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
