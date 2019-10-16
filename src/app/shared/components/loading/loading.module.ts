import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataDelayDirective } from './data-delay.directive';
import { LoadingCubeComponent } from './components/cube/loading-cube.component';
import { LoadingDiamondComponent } from './components/diamond/loading-diamond.component';
import { LoadingTableComponent } from './components/table/loading-table.component';
import { LoadingDataDelayComponent } from './components/data-delay/loading-data-delay.component';

@NgModule({
  declarations: [
    DataDelayDirective,
    LoadingCubeComponent,
    LoadingDiamondComponent,
    LoadingTableComponent,
    LoadingDataDelayComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    LoadingCubeComponent,
    LoadingDiamondComponent,
    LoadingTableComponent,
    LoadingDataDelayComponent
  ]
})
export class LoadingModule { }
