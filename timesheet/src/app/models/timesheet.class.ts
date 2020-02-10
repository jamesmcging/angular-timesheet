import {Billable} from './billable.class';
import {BillableState} from './billableState.enum';

export class TimeSheet {
    nId: number;
    arrBillables: Billable[];
    objNewBillable: Billable;
    nDefaultRate: number;

    constructor(nId: number) {
        this.nId = nId;
        this.arrBillables = [];
        this.objNewBillable = new Billable();
        this.nDefaultRate = 25050;
    }

    getBillables(): Billable[] {
        return this.arrBillables;
    }

    getBillableById(nId: number): Billable {
        return this.arrBillables.find(objBillable => objBillable.nId = nId);
    }

    /**
     * Creates a new Billable. this is not added to arrBillables until setNewBillableActive is called
     */
    setNewBillable(): Billable {
        this.objNewBillable = new Billable();
        this.objNewBillable.nState = BillableState.NEW;
        this.objNewBillable.nDate = new Date().getTime();
        this.objNewBillable.nDuration = 60;
        this.objNewBillable.nRate = this.nDefaultRate;

        return this.objNewBillable;
    }

    /**
     * Takes the existing new billable and adds it into arrBillables
     */
    setNewBillableActive(): Billable[] {
        // set the new billable state to active
        this.objNewBillable.setBillableState(BillableState.ACTIVE);

        // give the new billable an ID one greater than any ID currently present
        let nHighestId = 1;
        this.arrBillables.map(objBillable => {
            if (objBillable.nId > nHighestId) {
                nHighestId = objBillable.nId;
            }
        });
        this.objNewBillable.setBillableValue('nId', nHighestId + 1);

        // add the new billable to arrBillables
        this.arrBillables.unshift(this.objNewBillable);

        // remove the objNewBillable
        this.setNewBillableCancelled();

        // Return the updated billable list
        return this.arrBillables;
    }

    /**
     * Sets the state all billables in arrBillables to SUBMITTED
     */
    submitBillables() {
        let nCount = 0;
        this.arrBillables.map(objBillable => {
            if (objBillable.setBillableState(BillableState.SUBMITTED)) {
                nCount++;
            }
        });

        return nCount;
    }

    /**
     * Sets the default rate in this timesheet.
     */
    setDefaultRate(nNewRate: number) {
        this.nDefaultRate = nNewRate;

        return this.nDefaultRate;
    }

    /**
     * Sets the objNewBillable to null, anything observing the objNewBillable should vanish
     */
    setNewBillableCancelled(): void {
        this.objNewBillable = null;
    }

    deleteBillableById(nId: number): boolean {
        const objBillableToDelete = this.arrBillables.find(objBillable => objBillable.nId === nId);
        if (objBillableToDelete && objBillableToDelete.nState === BillableState.ACTIVE) {
            this.arrBillables = this.arrBillables.filter(objBillable => objBillable.nId !== nId);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Replaces an existing billable with an updated version
     * @param {Billable} objNewBillable
     */
    updateBillable(objNewBillable: Billable) {
        const nIndex = this.arrBillables.findIndex(objBillable => objBillable.nId === objNewBillable.nId);
        this.arrBillables[nIndex] = objNewBillable;
    }
}
