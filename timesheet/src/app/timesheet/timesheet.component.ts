import {Component, OnInit} from '@angular/core';
import {TimeSheet} from '../models/timesheet.class';
import {TimeSheetService} from '../timesheet.service';
import {Billable} from '../models/billable.class';
import {BillableState} from '../models/billableState.enum';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimeSheetComponent implements OnInit {

    private objTimeSheet: TimeSheet;
    arrBillables: Billable[];

    constructor(
        private srvTimeSheetService: TimeSheetService
    ) {}

    ngOnInit() {
        this.objTimeSheet = this.srvTimeSheetService.getTimeSheet();
        this.arrBillables = this.objTimeSheet.getBillables();
    }

    getBillables(): Billable[] {
        return this.objTimeSheet.getBillables();
    }

    getBillableById(nId): Billable {
        return this.objTimeSheet.getBillableById(nId);
    }

    /**
     * Creates a new Billable in the current time sheet objNewBillable.
     */
    setNewBillable(): Billable {
        if (this.objTimeSheet.objNewBillable) {
            window.alert(`You can only have one new billable. Please submit the existing billable before creating a new one.`);
        } else {
            return this.objTimeSheet.setNewBillable();
        }
    }

    submitBillables(): number {
        return this.objTimeSheet.submitBillables();
    }

    setDefaultRate(nDefaultRate): number {
        return this.objTimeSheet.setDefaultRate(nDefaultRate);
    }


    setNewBillableActive(event) {
        return this.objTimeSheet.setNewBillableActive();
    }

    setNewBillableCancelled(event): void {
        return this.objTimeSheet.setNewBillableCancelled();
    }

    deleteBillable(nId: number) {
        this.objTimeSheet.deleteBillableById(nId);
        this.arrBillables = this.objTimeSheet.getBillables();
    }

    updateBillable(objBillable: Billable) {
        this.objTimeSheet.updateBillable(objBillable);
        this.arrBillables = this.objTimeSheet.getBillables();
    }

    getDisplayRate() {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(this.objTimeSheet.nDefaultRate / 100);
    }

    updateDefaultRate(sNewDefaultRate) {
        const nNewDefaultRate = parseFloat(parseFloat(sNewDefaultRate.replace(/[^\d\.]/g, '')).toFixed(2)) * 100;

        this.objTimeSheet.setDefaultRate(nNewDefaultRate);
    }

    getBillableClasses(objBillable: Billable) {
        switch(objBillable.nState) {
            case BillableState.ACTIVE: return {'table-success': true};
            case BillableState.EDITABLE: return {'table-info': true};
            // case BillableState.NEW: return {};
            case BillableState.SUBMITTED: return {'table-secondary': true};
        }
    }
}
