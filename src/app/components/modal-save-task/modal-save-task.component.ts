import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal-save-task',
  templateUrl: './modal-save-task.component.html',
  styleUrls: ['./modal-save-task.component.sass']
})
export class ModalSaveTaskComponent implements OnInit {

  public editTask: Boolean = false;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
