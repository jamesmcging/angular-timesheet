import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BillableComponent} from './billable.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Billable} from '../models/billable.class';
import {BillableState} from '../models/billableState.enum';
import {BillableType} from '../models/billableType.enum';


describe('BillableComponent', () => {
    let component: BillableComponent;
    let fixture: ComponentFixture<BillableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BillableComponent
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BillableComponent);
        component = fixture.componentInstance;
        component.objBillable = new Billable();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it ('default billable should have a state of new', () => {
        expect(component.objBillable.nState).toEqual(BillableState.NEW);
    });

    it ('default billable should not be settable to active', () => {
        component.setNewBillableActive();
        expect(component.objBillable.nState).toEqual(BillableState.NEW);
    });

    it ('default billable state should be set to active when it has a title, type and duration', () => {
        component.updateDuration('3600');
        component.updateTitle('test billable');
        component.updateType(BillableType.RESEARCH.toString());
        component.setNewBillableActive();
        expect(component.objBillable.nState).toEqual(BillableState.ACTIVE);
    });

    it ('default billable state should NOT be set to active if it does not have a title', () => {
        component.updateDuration('3600');
        component.updateType(BillableType.RESEARCH.toString());
        component.setNewBillableActive();
        expect(component.objBillable.nState).toBe(BillableState.NEW);
    });

    it ('setting a billable title to TEST should update billable.title', () => {
        component.updateTitle('TEST');
        expect(component.objBillable.sTitle).toEqual('TEST');
    });

    it ('setting a billable duration to 60 should update billable.nDuration', () => {
        component.updateDuration('60');
        expect(component.objBillable.nDuration).toEqual(60);
    });

    it ('setting a billable rate to 100 and duration to 3600 should return a total of $100.00', () => {
        component.objBillable.nRate = 500; // $5.00
        component.updateDuration('3600'); // 1 hour
        expect(component.getTotal()).toEqual('$5.00');
    });

    it ('expects billable to become editable if set to editable when is Active', () => {
        component.updateDuration('3600');
        component.updateTitle('test billable');
        component.updateType(BillableType.RESEARCH.toString());
        component.setNewBillableActive();
        component.setBillableState(BillableState.EDITABLE);
        // expect(component.objBillable.sTitle).toEqual('test billable');
        expect(component.getDisplayState()).toEqual('Editable');
    });

});
