import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { TaskWork } from './task-work';

@Injectable({
  providedIn: 'root'
})
export class TaskWorkService {

  private endPoint: string;

  constructor(private base: BaseService) {
    this.endPoint = 'taskwork';
  }

  getAllTasks(): Observable<any> {

    return this.base.get(this.endPoint);
  }

  saveNewTask(taskWork: TaskWork): Observable<any> {
    return this.base.post(this.endPoint, taskWork);
  }

  updateTask(taskWork: TaskWork): Observable<any> {
    return this.base.put(`${this.endPoint}/${taskWork.id}`, taskWork);
  }

  deleteTask(taskWork: TaskWork | string): Observable<any> {
    if (typeof taskWork === 'string') {
      return this.base.delete(`${this.endPoint}/${taskWork}`);
    }
    return this.base.delete(`${this.endPoint}/${taskWork.id}`);
  }
}
