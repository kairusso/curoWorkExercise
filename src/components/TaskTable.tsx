import { Component } from 'react';

import { Group, TaskType, Task, TaskSplit } from '../interfaces'

// Strings for the different Week Days
const weekDayString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Table to Review the Employee's Tasks
 */
interface TaskTableParameters {
    tasks: Task[]
}
export class TaskTable extends Component {

    groups: Group[] = [];
    currentGroup!: Group;

    // Constructor for the Task Table Class
    constructor(props: TaskTableParameters) {
        super(props);
        this.state = {
            showThisWeeksTasks: false,
            taskMovingTo: '',
        }
    }

    moveTask(task: Task, nameOfGroupToMoveTo: string) {
        // Remove Task from old Group
        let indexOf = -1;
        for (let i = 0; i < this.currentGroup.tasks) {

        }
        

        // Add Task to new Group
        let groupMovingTo: Group | null = null;
        for (let group of this.groups) {
            if (nameOfGroupToMoveTo === group.name) {
                groupMovingTo = group;
                break;
            }
        }
        if (!groupMovingTo) { return; }

        groupMovingTo.tasks.push(task);
    }

    // Hook to Render the UI for this Component
    render() {
        // Generate Task Splits to display to the User
        let taskSplits: TaskSplit[] = [];

        // If we're viewing "this weeks tasks", split by Day
        if ((this.state as any).showThisWeeksTasks) {
            let now = new Date();

            // For each of the next 7 Days, generate a Header and Table
            for (let iDay = 0; iDay < 7; iDay++) {
                let weekDay = now.getDay();

                taskSplits.push({
                    header: weekDayString[weekDay] + ' Tasks',
                    tasks: (this.props as any).tasks.filter((task: Task) => {
                        if (task.recurring && task.weekDays.includes(weekDay)) { return true; }
                        if (!task.recurring && task.date && now.getDate() === task.date.getUTCDate()) { return true; }
                        return false;
                    }),
                })
                now.setDate(now.getDate() + 1);
            }
        }
        // If viewing "All Tasks", split by recurring vs. one-time
        else {
            taskSplits = [{
                header: 'Recurring Tasks',
                tasks: (this.props as any).tasks.filter((task: Task) => { return task.recurring }),
            },
            {
                header: 'One-Off Tasks',
                tasks: (this.props as any).tasks.filter((task: Task) => { return !task.recurring }),
            }]
        }

        // Generate TSX for each Table Split
        const taskTables = taskSplits.map((taskSplit) => {
            // Shortcut if there are no Tasks for the Table
            if (!taskSplit.tasks.length) {
                return <div key={taskSplit.header}>
                    <h5 className='marginTop10'>No {taskSplit.header}</h5>
                </div>
            }

            // Generate rows for this table
            const tasksRows = taskSplit.tasks.map((task) => {
                let key = taskSplit.header + '_' + task._id;

                let whenColumnTime = 'At ' + task.timeHr + (task.timeMin ? ':' + task.timeMin : '') + ' on '
                let whenColumnDay = task.recurring ?
                    task.weekDays.sort().map((a) => { return weekDayString[a] }).join(', ') :
                    task.date?.toUTCString().split(' ').slice(0, 3).join(' ');

                let category = TaskType[task.category][0].toUpperCase() + TaskType[task.category].slice(1);

                let groupsSelectOptions: any[] = []
                for (let group of this.groups) {
                    groupsSelectOptions.push(<option value={group.name}>{group.name}</option>)
                }

                return (
                    <tr key={key}>
                        <td>
                            {task._id}
                        </td>
                        <td>
                            {task.task}
                        </td>
                        <td>
                            {category}
                        </td>
                        <td>
                            {task.hours}
                        </td>
                        <td>
                            {whenColumnTime + whenColumnDay}
                        </td>
                        <td>
                            <select
                                className="form-select"
                                value={(this.state as any).taskMovingTo}
                                multiple={true}
                                onChange={(e) => setTaskMovingTo(e.target.value)} >

                                {groupsSelectOptions}
                            </select>
                            <button onClick="MoveTask">Move to Group</button>
                        </td>
                    </tr>
                )
            });

            // Create Header row and place generate Rows below it
            return <div key={taskSplit.header}>
                <h5 className='marginTop10'>{taskSplit.header}:</h5>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col" className="centerText">Category</th>
                            <th scope="col">Hours</th>
                            <th scope="col">When</th>
                            <th scope="col">Move</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasksRows}
                    </tbody>
                </table>
            </div>
        })

        // Generate Main Form
        return (
            <div>
                <h4 className='marginTop40'>Tasks:</h4>
                <label>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        checked={(this.state as any).showThisWeeksTasks}
                        onChange={(e) => this.setState({ showThisWeeksTasks: e.target.checked })} />
                    {' '}
                    Next 7 Days
                </label>

                {taskTables}
            </div>
        );
    }
}