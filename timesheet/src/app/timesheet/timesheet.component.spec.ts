import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetComponent } from './timesheet.component';
import { TimeSheetService } from '../timesheet.service';
import { BillableComponent} from '../billable/billable.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TimeSheet} from '../models/timesheet.class';
import {Billable} from '../models/billable.class';

describe('TimesheetComponent', () => {
    let service: TimeSheetService;
    let component: TimeSheetComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                declarations: [
                    TimeSheetComponent,
                    BillableComponent
                ],
                imports: [
                    FormsModule,
                    ReactiveFormsModule
                ],
                providers: []
        })
        .compileComponents();
    }));

    beforeEach(() => {
        service = new TimeSheetService();
        component = new TimeSheetComponent(service);
        component.objTimeSheet = service.getTimeSheet();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it ('should return an array of billables', () => {
    //     const objBillable = new Billable();
    //     expect(component.getBillables()).toEqual(jasmine.any(Billable));
    // });
});
