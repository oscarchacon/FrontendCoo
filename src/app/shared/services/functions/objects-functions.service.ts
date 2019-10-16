import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectsFunctionsService {

  constructor() { }

  cloneObjectWithoutMethods(objectIn: any): any {
    const objectOut = Object.assign({}, objectIn);
    return objectOut;
  }

  cloneObjectWithMethods(objectIn: any): any {
    const objectOut = Object.create(objectIn);
    return objectOut;
  }

  compareObjects(objectFirst: any, objectSecond: any): boolean {
    if (objectFirst === objectSecond) {
      return true;
    }
    for (let propertie in objectFirst) {
      if (objectSecond.hasOwnProperty(propertie)) {
        if (objectFirst[propertie] !== objectSecond[propertie]) {
          return false;
        }
      }
    }
    for (let propertie in objectSecond) {
      if (objectFirst.hasOwnProperty(propertie)) {
        if (objectFirst[propertie] !== objectSecond[propertie]) {
          return false;
        }
      }
    }
    if (typeof(objectFirst) !== typeof(objectSecond)) {
      return false;
    }

    if (JSON.stringify(objectFirst) !== JSON.stringify(objectSecond)) {
      return false;
    }

    if (Object.entries(objectFirst).toString() !== Object.entries(objectSecond).toString()) {
      return false;
    }

    return true;
  }
}
