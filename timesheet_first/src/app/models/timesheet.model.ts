import {Task as objTask} from './Task.model'
import {TaskState} from './taskState.enum';

export class Timesheet {
    nId: number;
    arrTasks: objTask[] = [];
    objNewTask: objTask = null;
    nDefaultRate: number;

    getTasks(): objTask[] {
        return this.arrTasks;
    }

    getTaskById(nId: number): objTask {
        return this.arrTasks.find(objTask => objTask.nId = nId);
    }

    /**
     * Creates a new objTask. this is not added to arrTasks until the timesheet is asked to add it
     * @returns {Task}
     */
    setNewTask(): objTask {
        this.objNewTask = new objTask();

        return this.objNewTask;
    }

    /**
     * Takes the existing new task and adds it into the list of tasks.
     * @returns {Task[]}
     */
    setNewTaskActive(): objTask[] {
        // set the new task state to active
        this.objNewTask.setTaskState(TaskState.ACTIVE);

        // add the new task to arrTasks
        this.arrTasks.push(this.objNewTask);

        // remove the objNewTask
        this.setNewTaskCancelled();

        // Return the updated task list
        return this.arrTasks;
    }

    /**
     * Sets the state all tasks in arrTasks to SUBMITTED
     */
    submitTasks() {
        let nCount = 0;
        this.arrTasks.map(objTask => {
            if (objTask.setTaskState(TaskState.SUBMITTED)) {
                nCount++;
            }
        });

        return nCount;
    }

    /**
     * Sets the default rate in this timesheet.
     *
     * @param nNewRate
     * @returns {number}
     */
    setDefaultRate(nNewRate) {
        this.nDefaultRate = nNewRate;

        return this.nDefaultRate;
    }

    /**
     * Sets the objNewTask to null, anything observing the objNewTask should vanish
     */
    setNewTaskCancelled(): void {
        this.objNewTask = null;
    }
}
