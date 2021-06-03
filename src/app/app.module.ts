import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatDatepickerModule } from '@angular/material/datepicker';

import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { GeneralReportComponent } from './report/general-report/general-report.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { Report1Component } from './report/report1/report1.component';
import { TrackingComponent } from './tracking/tracking.component';
import { DetailedTrackingComponent } from './tracking/detailed-tracking/detailed-tracking.component';
import { ConfigComponent } from './config/config.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddConfigDialogComponent } from './dialog/add-config-dialog/add-config-dialog.component';
import { EditConfigDialogComponent } from './dialog/edit-config-dialog/edit-config-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { HistoryConfigComponent } from './dialog/history-config/history-config.component';
import { NewCustomersComponent } from './tracking/new-customers/new-customers.component';
import { NotifyComponent } from './notify/notify.component';

const routes: Routes = [
  {path: '', component: TrackingComponent},
  { path: 'general-report', component:  GeneralReportComponent},
  {path: 'report1', component: Report1Component},
  {path: 'tracking', component: TrackingComponent},
  {path: 'tracking/:id', component: DetailedTrackingComponent},
  {path: 'config', component: ConfigComponent},
  {path: 'new-customers', component: NewCustomersComponent},
  {path: 'notify', component: NotifyComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GeneralReportComponent,
    Report1Component,
    TrackingComponent,
    DetailedTrackingComponent,
    ConfigComponent,
    AddConfigDialogComponent,
    EditConfigDialogComponent,
    HistoryConfigComponent,
    NewCustomersComponent,
    NotifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
