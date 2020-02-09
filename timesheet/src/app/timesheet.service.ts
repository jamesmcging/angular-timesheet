import {Injectable} from '@angular/core';
import {TimeSheet} from './models/timesheet.class';
import {BillableType} from './models/billableType.enum';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

    private objTimeSheet: TimeSheet;

    constructor() {
        this.objTimeSheet = new TimeSheet(1);
        this.objTimeSheet.setDefaultRate(25050);

        let objNewBillable = this.objTimeSheet.setNewBillable();
        objNewBillable.setBillableValue('nDate', new Date('August 2 2020').getTime());
        objNewBillable.setBillableValue('sTitle', 'Task 2');
        objNewBillable.setBillableValue('nDuration', 185 * 60);
        objNewBillable.setBillableValue('nRate', 12000);
        objNewBillable.setBillableType(BillableType.RESEARCH);
        this.objTimeSheet.setNewBillableActive();
        this.objTimeSheet.submitBillables();

        objNewBillable = this.objTimeSheet.setNewBillable();
        objNewBillable.setBillableValue('nDate', new Date('January 1, 2019').getTime());
        objNewBillable.setBillableValue('sTitle', 'Task 1');
        objNewBillable.setBillableValue('nDuration', 130 * 60);
        objNewBillable.setBillableValue('nRate', 25050);
        objNewBillable.setBillableType(BillableType.TELEPHONE_CALL);
        this.objTimeSheet.setNewBillableActive();

        objNewBillable = this.objTimeSheet.setNewBillable();
        objNewBillable.setBillableValue('nRate', 25050);
        objNewBillable.setBillableValue('nDate', new Date().getTime());
    }

    getTimeSheet() {
        return this.objTimeSheet;
    }

    deleteBillableInTimeSheet(nBillableId: number): boolean {
        return this.objTimeSheet.deleteBillableById(nBillableId);
    }
}
