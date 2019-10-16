import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ModalSaveTaskComponent } from './components/modal-save-task/modal-save-task.component';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UtilsModule } from './utils/utils.module';
import { CoreModule } from './core/core.module';
import { LoadingModule } from './shared/components/loading';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuestionModule } from './shared/components/question/question.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalSaveTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    UtilsModule,
    CoreModule,
    LoadingModule,
    QuestionModule
  ],
  entryComponents: [
    ModalSaveTaskComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
