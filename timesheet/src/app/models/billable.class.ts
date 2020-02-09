import {BillableState} from './billableState.enum';
import {BillableType} from './billableType.enum';

export class Billable {
    nId: number;
    nState: BillableState;
    nDate: number; // epoch (seconds)
    sTitle: string;
    nType: BillableType;
    nDuration: number; // seconds
    nRate: number; // cents per hour

    setBillableState(nNewBillableState: BillableState): boolean {
        if (this.nState !== nNewBillableState) {
            if (this.nState === BillableState.NEW && nNewBillableState === BillableState.ACTIVE) {
                // New billables can become active
                this.nState = nNewBillableState;
                return true;
            } else if (this.nState === BillableState.ACTIVE && nNewBillableState === BillableState.EDITABLE) {
                // Active billables can become editable
                this.nState = nNewBillableState;
                return true;
            } else if (this.nState === BillableState.ACTIVE && nNewBillableState === BillableState.SUBMITTED) {
                // Active billables can become submitted
                this.nState = nNewBillableState;
                return true;
            } else if (this.nState === BillableState.EDITABLE && nNewBillableState === BillableState.ACTIVE) {
                // Editable billables can become active
                this.nState = nNewBillableState;
                return true;
            } else {
                // All other state changes are forbidden
                return false;
            }
        } else {
            return false;
        }
    }

    setBillableType(nBillableType: BillableType) {
        this.nType = nBillableType;
    }

    setBillableValue(sField: string, xValue: any) {
        if (['nId', 'nDate', 'sTitle', 'nDuration', 'nRate'].includes(sField)) {
            this[sField] = xValue;
        }
    }

    getDisplayType() {
        switch (this.nType) {
            case (1): return 'Telephone call';
            case (2): return 'Drafting document';
            case (3): return 'Research';
            default: return 'Unknown Type';
        }
    }

    getDisplayState() {
        switch (this.nState) {
            case (1): return 'New';
            case (2): return 'Active';
            case (3): return 'Editable';
            case (4): return 'Submitted';
            default: return 'Unknown State';
        }
    }
}
