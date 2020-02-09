import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeSheetComponent } from './timesheet/timesheet.component';

import { TimeSheetService } from './timesheet.service';
import { BillableComponent } from './billable/billable.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        TimeSheetComponent,
        BillableComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [
        TimeSheetService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
