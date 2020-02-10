import { TestBed } from '@angular/core/testing';

import { TimeSheetService } from './timesheet.service';
import { Billable } from './models/billable.class';

describe('TimeSheetService', () => {

    // let component: BillableComponent;
    // let fixture: ComponentFixture<BillableComponent>;

    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: TimeSheetService = TestBed.get(TimeSheetService);
        expect(service).toBeTruthy();
    });

    it('should add new billable when objNewBillable is clicked', () => {
        const service: TimeSheetService = TestBed.get(TimeSheetService);
        const objTimeSheet = service.getTimeSheet();
        const objNewBillable = objTimeSheet.setNewBillable();
        expect(objNewBillable).toEqual(jasmine.any(Billable));
    });

    it('should NOT add new billable when objNewBillable is clicked and a new objNewBillable already exists', () => {
        const service: TimeSheetService = TestBed.get(TimeSheetService);
        const objTimeSheet = service.getTimeSheet();
        const objFirstNewBillable = objTimeSheet.setNewBillable();
        const objSecondNewBillable = objTimeSheet.setNewBillable();
        expect(objSecondNewBillable).not.toBe(jasmine.any(Billable));
    });

    it ('should remove Billable from arrBillables when deleteBillableById is called', () => {

    });

});
