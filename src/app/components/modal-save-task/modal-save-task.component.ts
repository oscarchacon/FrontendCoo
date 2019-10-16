import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { UnsusbscribeFunctionsService } from '../../utils/unsusbscribe-functions.service';
import { ToastrService } from 'ngx-toastr';
import { QuestionModalService } from '../../shared/components/question/question-modal.service';
import { ObjectsFunctionsService } from '../../shared/services/functions/objects-functions.service';
import { TaskWork } from 'src/app/core/services/task-work';
import { Subscription, Subject } from 'rxjs';
import { TaskWorkService } from 'src/app/core/services/task-work.service';

@Component({
  selector: 'app-modal-save-task',
  templateUrl: './modal-save-task.component.html',
  styleUrls: ['./modal-save-task.component.sass']
})
export class ModalSaveTaskComponent implements OnInit, OnDestroy {

  public editTask: Boolean = false;
  public taskWork: TaskWork;
  public taskWorks: TaskWork[] = [];

  requestLoading: Boolean;

  saveTaskWorkFunction: Subscription;
  responseModalFunction: Subscription;

  onclose: Subject<TaskWork> = new Subject();

  cloneTaskWork: TaskWork;

  bsModalRefResponse: BsModalRef;

  constructor(public bsModalRef: BsModalRef,
              private taskWorkService: TaskWorkService,
              private unsubscribeService: UnsusbscribeFunctionsService,
              private toastrService: ToastrService,
              private questionModalService: QuestionModalService,
              private objectFunction: ObjectsFunctionsService,) {
    this.requestLoading = false;
  }

  ngOnInit() {
    this.cloneTaskWork = this.objectFunction.cloneObjectWithoutMethods(this.taskWork);
  }

  ngOnDestroy() {
    this.unsubscribeService.unsubscribeSubscription(this.saveTaskWorkFunction);
    this.unsubscribeService.unsubscribeSubscription(this.responseModalFunction);
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  checkDataForSave(taskWork: TaskWork): boolean {
    if (this.editTask) {
      if (taskWork.id == null || taskWork.id === '') {
        this.toastrService.warning(`Falta Id de Tarea`, `Formulario de Tarea`, {
          timeOut: 2000,
          closeButton: true,
        });
        return false;
      }
    }
    if (taskWork.title == null || taskWork.title === '') {
      this.toastrService.warning(`Falta ingresar Título`, `Formulario de Tarea`, {
        timeOut: 2000,
        closeButton: true,
      });
      return false;
    }
    if (taskWork.description == null || taskWork.description === '') {
      this.toastrService.warning(`Falta ingresar Descripción`, `Formulario de Tarea`, {
        timeOut: 2000,
        closeButton: true,
      });
      return false;
    }

    return true;
  }

  saveNewTask(taskWork: TaskWork): void {
    if (this.checkDataForSave(taskWork)) {
      taskWork.createDate = new Date();
      this.saveTaskWorkFunction = this.taskWorkService
                                      .saveNewTask(taskWork)
                                      .subscribe((response: any) => {
                                        this.taskWork = response;
                                        //this.taskWorks.push(this.taskWork);
                                        this.onclose.next(this.taskWork);
                                        this.toastrService
                                            .success(`Tarea se ingreso Correctamente`, `Éxito al Ingreso`, {
                                              timeOut: 2000,
                                              closeButton: true,
                                            });
                                        this.bsModalRef.hide();
                                        }, error => {
                                          this.toastrService
                                              .error(`Error al ingresar nueva Tarea: ${error}`, `Error`, {
                                                timeOut: 2000,
                                                closeButton: true,
                                              });
                                      });
    }
  }

  saveEditTask(taskWork: TaskWork): void {
    if (this.checkDataForSave(taskWork)) {
      this.saveTaskWorkFunction = this.taskWorkService
                                      .updateTask(taskWork)
                                      .subscribe((response: any) => {
                                        this.taskWork = response;
                                        this.onclose.next(this.taskWork);
                                        this.toastrService
                                            .success(`Tarea se actualizo Correctamente`, `Éxito al Actualizar`, {
                                              timeOut: 2000,
                                              closeButton: true,
                                            });
                                        this.bsModalRef.hide();
                                        }, error => {
                                          this.toastrService
                                              .error(`Error al actualizar Tarea: ${error}`, `Error`, {
                                              timeOut: 2000,
                                              closeButton: true,
                                            });
                                        });
    }
  }

  checkEditWhenClose(): void {
    if (!this.objectFunction.compareObjects(this.taskWork, this.cloneTaskWork)) {
      this.bsModalRefResponse = this.questionModalService.openModalQuestion('¿Quiere cerrar sin guardar los cambios?', '¿Esta seguro?');
      this.responseModalFunction = this.bsModalRefResponse.content.says.subscribe((response: any) => {
                                        if (response.question) {
                                          this.taskWork = this.cloneTaskWork;
                                          // tslint:disable-next-line: max-line-length
                                          const index = this.taskWorks.findIndex(taskW => taskW.id === this.taskWork.id);
                                          this.taskWorks[index] = this.taskWork;
                                          this.onclose.next(null);
                                          this.closeModal();
                                        }
                                      });
    } else {
      this.onclose.next(null);
      this.closeModal();
    }
  }

  checkNewWhenClose(): void {
    const taskWorkCompare: TaskWork = {};
    if (!this.objectFunction.compareObjects(this.taskWork, taskWorkCompare)) {
      this.bsModalRefResponse = this.questionModalService.openModalQuestion('¿Quiere cerrar sin guardar los cambios?', '¿Esta seguro?');
      this.responseModalFunction = this.bsModalRefResponse.content.says.subscribe((response: any) => {
                                        if (response.question) {
                                          this.taskWork = {};
                                          this.onclose.next(null);
                                          this.closeModal();
                                        }
                                      });
    } else {
      this.onclose.next(null);
      this.closeModal();
    }
  }
}
