import {TaskState} from './taskState.enum';
import {TaskType} from './taskType.enum';

export class Task {
    nId: number;
    nState: TaskState;
    nDate: number; // epoch (seconds)
    sTitle: string;
    nType: TaskType;
    nDuration: number; // seconds
    nRate: number; //cents

    setTaskState(nTaskState: TaskState): boolean {
        if (this.nState !== nTaskState) {
            this.nState = nTaskState;
            return true;
        } else {
            return false;
        }
    }
    setTaskType(nTaskType: TaskType) {
        this.nType = nTaskType;
    }
    setTaskValue(sField: string, xValue: any) {
        if (['nId', 'nDate', 'sTitle', 'nDuration', 'nRate'].includes(sField)) {
            this[sField] = xValue;
        }
    }
}
