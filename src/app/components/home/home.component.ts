import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskWorkService } from 'src/app/core/services/task-work.service';
import { TaskWork } from 'src/app/core/services/task-work';
import { UnsusbscribeFunctionsService } from 'src/app/utils/unsusbscribe-functions.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { QuestionModalService } from 'src/app/shared/components/question/question-modal.service';
import { ModalSaveTaskComponent } from '../modal-save-task/modal-save-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {

  taskWorks: TaskWork[] = [];

  taskWorksSubscription: Subscription;
  responseModalSubscription: Subscription;
  taskWorkDeleteFunction: Subscription;

  loadingEvents: Boolean;

  bsModalRef: BsModalRef;
  bsModalRefResponse: BsModalRef;

  constructor(private taskWorkService: TaskWorkService,
              private unsubscribeFunction: UnsusbscribeFunctionsService,
              private toastrService: ToastrService,
              private modalService: BsModalService,
              private questionModalService: QuestionModalService) {
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
    const conf = {
      initialState: {
        taskWork: {},
        taskWorks: this.taskWorks
      },
      class: 'modal-md',
      ignoreBackdropClick: true,
      keyboard: false,
    };

    this.bsModalRef = this.modalService.show(ModalSaveTaskComponent, conf);
    this.responseModalSubscription = this.bsModalRef.content.onclose.subscribe((response: any) => {
      if (response != null) {
        this.getAllTasks();
      }
    });
  }

  editTask(taskWork: TaskWork): void {
    const conf = {
      initialState: {
        taskWork: taskWork,
        taskWorks: this.taskWorks,
        editTask: true
      },
      class: 'modal-md',
      ignoreBackdropClick: true,
      keyboard: false,
    };

    this.bsModalRef = this.modalService.show(ModalSaveTaskComponent, conf);
    this.responseModalSubscription = this.bsModalRef.content.onclose.subscribe((response: any) => {
      if (response != null) {
        this.getAllTasks();
      }
    });
  }

  removeTask(taskWork: TaskWork): void {
    // tslint:disable-next-line: max-line-length
    this.bsModalRefResponse = this.questionModalService.openModalQuestion(`¿Quiere eliminar la Tarea: ${taskWork.title}?`, '¿Esta seguro?');
    this.responseModalSubscription = this.bsModalRefResponse.content.says.subscribe((response: any) => {
      if (response.question) {
        this.loadingEvents = true;
        this.taskWorkDeleteFunction = this.taskWorkService
                                          .deleteTask(taskWork)
                                          // tslint:disable-next-line: no-shadowed-variable
                                          .subscribe((responseDelete: any) => {
                                            this.loadingEvents = false;
                                            this.getAllTasks();
                                            this.toastrService
                                                .success(`Se elimino correctamente la Tarea`,
                                                          `Éxito en Eliminación`,
                                                          {
                                                            timeOut: 2000,
                                                            closeButton: true,
                                                          });
                                          }, error => {
                                            this.loadingEvents = false;
                                            this.toastrService
                                                .error(`No se puede Eliminar la Tarea: ${taskWork.title}`,
                                                      `Error`,
                                                      {
                                                        timeOut: 2000,
                                                        closeButton: true,
                                                      });
                                            console.error(error);
                                          });
      }
    });
  }

}
