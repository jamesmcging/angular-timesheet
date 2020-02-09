import { Component } from '@angular/core';
import { Timesheet } from './models/timesheet.model';
import { TaskComponent } from './task/task.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'timesheet';
    objTimeSheet: Timesheet;

    constructor() {}

    ngOnInit() {
        this.objTimeSheet = new Timesheet();
        console.log(this.objTimeSheet);
    }
}
