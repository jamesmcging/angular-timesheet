import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Billable} from '../models/billable.class';
import {BillableState} from '../models/billableState.enum';


@Component({
  selector: '[app-billable]',
  templateUrl: './billable.component.html',
  styleUrls: ['./billable.component.css']
})
export class BillableComponent implements OnInit {

    @Input() objBillable: Billable;

    @Output() setNewBillableCancelledEvent = new EventEmitter();
    @Output() setNewBillableActiveEvent = new EventEmitter();

    @Output() deleteBillableEvent = new EventEmitter<number>();
    @Output() updateBillableEvent = new EventEmitter<Billable>();

    constructor() {
        if (!this.objBillable) {
            this.objBillable = new Billable();
        }
    }

    ngOnInit() {}

    getState() {
        return this.objBillable.nState;
    }

    getDisplayState() {
        return this.objBillable.getDisplayState();
    }

    getDisplayDate() {
        return new Date(this.objBillable.nDate).toLocaleDateString();
    }

    getDisplayType() {
        return this.objBillable.getDisplayType();
    }

    getDisplayDuration() {
        const nHours = Math.floor(this.objBillable.nDuration / 3600);
        const nRemainingSeconds = this.objBillable.nDuration - (nHours * 3600);
        const nMinutes = Math.floor(nRemainingSeconds / 60).toString().padStart(2, '0');

        return `${nHours}:${nMinutes}`;
    }

    getDisplayRate() {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(this.objBillable.nRate / 100);
    }

    getTotal() {
        // nRate is the billable amount of cents per hour
        // nRateBySecond is the billable amount of cents per second
        const nRateBySecond = this.objBillable.nRate / 3600;
        // nDuration is the length of the billable in seconds
        const nTotalInCents = nRateBySecond * this.objBillable.nDuration;

        // nDuration is the billable period in seconds
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(nTotalInCents / 100);
    }

    /**
     * This is triggered by the Save button in the billable item.
     */
    setNewBillableActive() {
        if (!this.objBillable.sTitle) {
            window.alert('In order to save this line you need to give it a title');
        } else if (!this.objBillable.nType) {
            window.alert('In order to save the line you need to set its type');
        } else if (!this.objBillable.nDuration) {
            window.alert('In order to save the line you need to set its duration');
        } else if (this.objBillable.nState === BillableState.NEW) {
            this.objBillable.setBillableState(BillableState.ACTIVE);
            this.setNewBillableActiveEvent.emit(this.objBillable);
        }
    }

    setNewBillableCancelled() {
        if (this.objBillable.nState === BillableState.NEW) {
            this.setNewBillableCancelledEvent.emit();
        }
    }

    setBillableState(nNewState: BillableState) {
        this.objBillable.setBillableState(nNewState);
        this.updateBillableEvent.emit(this.objBillable);
    }

    deleteBillable(nId) {
        if (window.confirm(' Are you sure you want to delete this line? This action cannot be undone.')) {
            this.deleteBillableEvent.emit(nId);
        }
    }

    showForm(): boolean {
        return [1, 3].includes(this.objBillable.nState);
    }

    updateTitle(sNewTitle: string) {
        this.objBillable.sTitle = sNewTitle;
    }

    updateType(sNewType: string) {
        this.objBillable.nType = parseInt(sNewType, 10);
    }

    updateDuration(sNewDuration: string) {
        this.objBillable.nDuration = parseInt(sNewDuration, 10);
    }
}
