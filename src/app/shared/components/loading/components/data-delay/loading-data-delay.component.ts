import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loading-data-delay',
  templateUrl: './loading-data-delay.component.html',
  styleUrls: ['./loading-data-delay.component.css']
})
export class LoadingDataDelayComponent implements OnInit {

  public loading: boolean = true;
  public inout: boolean = true;

  constructor() { }

  ngOnInit() {

  }

}
