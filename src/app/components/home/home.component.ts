import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskWorkService } from 'src/app/core/services/task-work.service';
import { TaskWork } from 'src/app/core/services/task-work';
import { UnsusbscribeFunctionsService } from 'src/app/utils/unsusbscribe-functions.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  taskWorks: TaskWork[] = [];

  taskWorksSubscription: Subscription;
  responseModalSubscription: Subscription;

  loadingEvents: Boolean;

  bsModalRef: BsModalRef;

  constructor(private taskWorkService: TaskWorkService,
              private unsubscribeFunction: UnsusbscribeFunctionsService,
              private toastrService: ToastrService,
              private modalService: BsModalService) {
    this.loadingEvents = false;
  }

  ngOnInit() {
    this.getAllTasks();
  }

  ngOnDestroy() {
    this.unsubscribeFunction.unsubscribeSubscription(this.taskWorksSubscription);
    this.unsubscribeFunction.unsubscribeSubscription(this.responseModalSubscription);
  }

  getAllTasks(): void {
    this.loadingEvents = true;
    this.taskWorksSubscription = this.taskWorkService.getAllTasks()
                                      .subscribe((response: any) => {
                                        this.taskWorks = response;
                                        this.loadingEvents = false;
                                      }, error => {
                                        this.toastrService.error(`Not loading Tasks: ${error}`, `Error`, {
                                          closeButton: true,
                                          timeOut: 2000,
                                        });
                                        this.loadingEvents = false;
                                      });
  }



  addNewTask(): void {
    console.log("hola");
  }

  editTask(taskWork: TaskWork): void {

  }

  removeTask(taskWork: TaskWork): void {

  }

}
