import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsusbscribeFunctionsService } from './unsusbscribe-functions.service';
import { ObjectsFunctionsService } from './objects-functions.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UnsusbscribeFunctionsService,
    ObjectsFunctionsService
  ]
})
export class FunctionsModule { }
