import { useState } from 'react';

import { TaskTable } from './components/TaskTable';
import { Group, User, TaskType, Task } from './interfaces'

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// Fake Data loaded from Server
const STARTING_USER: User = {
    name: 'Demo User',
    weeklyHours: 40,
};

// Fake Data loaded from Server
const STARTING_GROUPS: Group[] = [
    {
        name:       'Group 1',
        tasks:      [
            { _id: 0, task: 'Morning Email', category: TaskType.email, hours: 0.5, timeHr: 9, timeMin: 0, recurring: true, weekDays: [1, 2, 3, 4, 5], },
            { _id: 1, task: 'EOD Email', category: TaskType.email, hours: 0.5, timeHr: 10, timeMin: 0, recurring: true, weekDays: [1, 2, 3, 4, 5], },
        ]
    },
    {
        name:       'Group 2',
        tasks:      [
            { _id: 2, task: 'Morning Stand-Up', category: TaskType.meeting, hours: 0.25, timeHr: 10, timeMin: 0, recurring: true, weekDays: [1, 2, 3, 4, 5], },
        ]
    }
];

// Export App 
export default function App() {
    return <EmployeeTimeManagement groupsLoaded={STARTING_GROUPS} userLoaded={STARTING_USER} />;
}

/**
 * Wrapper for the entire Employee Time Management App
 */
interface EmployeeTimeManagementParameters {
    groupsLoaded: Group[],
    userLoaded: User,
}
export function EmployeeTimeManagement({ groupsLoaded, userLoaded }: EmployeeTimeManagementParameters) {
    // Init Functional Parameter State
    const [groups, setGroups] = useState<Group[]>(groupsLoaded);

    // TODO: Move to Group
    // Derive additional Parameters from Props
    // let nextID = -1;
    // for (let task of tasks) {
    //     if (task._id >= nextID) { nextID = task._id + 1; }
    // }

    // Get around "not assignable to type 'IntrinsicAttributes & IntrinsicClassAttributes" Compiler Error
    let taskTableParams = { groups: groups };

    // Generate TSX
    return (
        <div className="container marginTop40">
            {/* For Managing the Employee's Data */}
            {/* <ManageFTEForm
                groups={groups}
                userLoaded={userLoaded} /> */}

            {/* Form for Adding a new Task for the Employee */}
            {/* <AddNewTaskForm
                groups={groups}
                onTaskChange={setGroups} */}
                {/* // nextID={nextID} />
                /> */}

            {/* Table to Review the Employee's Tasks */}
            <GroupTable 
                groups={groups}
                />
        </div>
    );
}

/**
 * For Managing the Employee's Data
 */
interface GroupTableParameters {
    groups: Group[],
    // userLoaded: User,
}
export function GroupTable({ groups }: GroupTableParameters) {

    // Generate TSX
    const groupsTSX = groups.map((group) => {
        let taskTableParams = { tasks: group.tasks };
        return (
            <div>
                <h5 className='marginTop10'>{group.name}:</h5>
                <TaskTable {...taskTableParams}  />
            </div>
        )
    });
    
    
    return (<>
        {groupsTSX}
    </>)
}

/**
 * For Managing the Employee's Data
 */
interface ManageFTEFormParameters {
    groups: Group[],
    userLoaded: User,
}
// export function ManageFTEForm({ groups, userLoaded }: ManageFTEFormParameters) {
//     // Init Functional Parameter State
//     const [name, setName] = useState<string>(userLoaded.name);
//     const [hours, setHours] = useState<number>(userLoaded.weeklyHours);

//     // Derive additional Parameters from Props

//     // Calculate Workload for next 7 Days
//     let in7Days = new Date();
//     in7Days.setDate(in7Days.getDate() + 7);
//     const next7DaysHours = tasks.reduce((total, task) => {
//         if (task.recurring) { return total + (task.weekDays.length * task.hours); }
//         else { return total + (task.date! < in7Days ? task.hours : 0); }
//     }, 0);
//     const next7DayWorkload = ((100 * next7DaysHours) / hours).toFixed(1) + ' %';

//     // Calculate Recurring Workload
//     const recurringHours = tasks.reduce((total, task) => {
//         return total + (task.recurring ? task.weekDays.length * task.hours : 0);
//     }, 0);
//     const recurringHoursWorkload = ((100 * recurringHours) / hours).toFixed(1) + ' %';
    
//     // Generate TSX
//     return (
//         <form>
//             <div className="row">
//                 <h4>Manage FTE:</h4>

//                 {/* See / Edit the Employee Name */}
//                 <div className="form-group col-md-3">
//                     <label htmlFor="employeeName">Employee Name</label>
//                     <input
//                         name="employeeName"
//                         className="form-control"
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)} />
//                 </div>

//                 {/* See / Edit the Employee Weekly Hours */}
//                 <div className="form-group col-md-3">
//                     <label htmlFor="employeeHours">Employee Hours</label>
//                     <input
//                         name="employeeHours"
//                         className="form-control"
//                         type="number"
//                         value={hours}
//                         onChange={(e) => setHours(+e.target.value)} />
//                 </div>

//                 {/* See the Employee Workload for the next 7 Days */}
//                 <div className="form-group col-md-3">
//                     <label>Next 7 Day Workload</label>
//                     <input
//                         name="text"
//                         className="form-control-plaintext"
//                         placeholder={next7DayWorkload + ' (' + next7DaysHours + ' Hrs)'}
//                         readOnly />
//                 </div>

//                 {/* See the Employee's Recurring Workload */}
//                 <div className="form-group col-md-3">
//                     <label>Recurring Workload</label>
//                     <input
//                         name="text"
//                         className="form-control-plaintext"
//                         placeholder={recurringHoursWorkload + ' (' + recurringHours + ' Hrs)'} 
//                         readOnly />
//                 </div>
//             </div>
//         </form >
//     );
// }

/**
 * Form for Adding a new Task for the Employee
 */
interface AddNewTaskFormParameters {
    groups: Group[],
    onTaskChange: React.Dispatch<React.SetStateAction<Task[]>>,
    nextID: number,
}
// export function AddNewTaskForm({ groups, onTaskChange, nextID }: AddNewTaskFormParameters) {
//     // Init Functional Parameter State
//     const [taskName, setTaskName] = useState<string>('');
//     const [taskCategory, setTaskCategory] = useState<number>(0);
//     const [hours, setHours] = useState<number>(0);
//     const [time, setTime] = useState<string>('');
//     const [recurring, setRecurring] = useState<boolean>(false);
//     const [dateString, setDateString] = useState<string>('');
//     const [weekDays, setWeekDays] = useState<string[]>([]);
//     const [errorMSG, setErrorMSG] = useState<string>();

//     // Init function to Handle a state change to the Weekdays Array
//     const handeWeekdays = (value: string) => {
//         let newWeekDays = weekDays.slice();
//         let indexOf = newWeekDays.indexOf(value);

//         if (indexOf === -1) { newWeekDays.push(value); }
//         else { newWeekDays.splice(indexOf, 1); }

//         setWeekDays(newWeekDays);
//     }

//     // Init function to Add a new Task to Tasks
//     const addNewTask = (event: any) => {
//         let newTasks = tasks.slice();

//         // Basic Validation
//         let dataInvalid = false;
//         if (!taskName) { dataInvalid = true; }
//         if (!hours || isNaN(hours)) { dataInvalid = true; }
//         if (!time || !time.includes(':')) { dataInvalid = true; }
//         if (!recurring && (!dateString || !(new Date(dateString)))) { dataInvalid = true; }
//         if (recurring && !weekDays.length) { dataInvalid = true; }
//         if (dataInvalid) {
//             setErrorMSG('Invalid Data');
//             return;
//         }

//         // Create New Task
//         let recurringDays = weekDays.map((day) => { return +day; });
//         let newTask: Task = {
//             '_id':          nextID,

//             'task':         taskName,
//             'category':     taskCategory,

//             'hours':        hours,

//             'timeHr':       +time.split(':')[0],
//             'timeMin':      +time.split(':')[1],

//             'recurring':    recurring,
//             'date':         !recurring ? new Date(dateString!) : undefined,
//             'weekDays':     recurringDays,
//         }
//         newTasks.push(newTask);

//         // Set Tasks
//         onTaskChange(newTasks);
//         setErrorMSG('');
//     }

//     // Dynamically Change UI based on Recurring Task or Not
//     let whenIsTaskUI: JSX.Element = <></>;

//     // If this is a Recurring Task, we want a Category Select, showing the Days of the Week this Task occurs
//     if (recurring) {
//         whenIsTaskUI = <div className="form-group col-md-3 marginTop10">
//             <label htmlFor="weekDays">Category</label>
//             <select
//                 name="weekDays"
//                 className="form-select"
//                 value={weekDays}
//                 multiple={true}
//                 onChange={(e) => handeWeekdays(e.target.value)} >

//                 <option value="1">Monday</option>
//                 <option value="2">Tuesday</option>
//                 <option value="3">Wednesday</option>
//                 <option value="4">Thursday</option>
//                 <option value="5">Friday</option>
//                 <option value="6">Saturday</option>
//                 <option value="0">Sunday</option>
//             </select>
//         </div>
//     }
//     // If this is a one-off Task, show a Date Input
//     else {
//         whenIsTaskUI = <div className="form-group col-md-3 marginTop10">
//             <label htmlFor="taskDate">Date</label>
//             <input
//                 name="taskDate"
//                 className="form-control"
//                 type="date"
//                 value={dateString}
//                 onChange={(e) => setDateString(e.target.value)} />
//         </div>
//     }

//     // Generate Main TSX Form
//     return (
//         <form>
//             <h4 className='marginTop40'>Add New Task:</h4>

//             <div className="row">
//                 {/* Add a Task Name */}
//                 <div className="form-group col-md-3">
//                     <label htmlFor="taskName">Task Name</label>
//                     <input
//                         name="taskName"
//                         className="form-control"
//                         type="text"
//                         value={taskName}
//                         onChange={(e) => setTaskName(e.target.value)} />
//                 </div>

//                 {/* Add the Task Category */}
//                 <div className="form-group col-md-3">
//                     <label htmlFor="taskCategory">Category</label>
//                     <select
//                         name="taskCategory"
//                         className="form-select"
//                         value={taskCategory}
//                         onChange={(e) => setTaskCategory(+e.target.value)} >

//                         <option value="0">None</option>
//                         <option value="1">Email</option>
//                         <option value="2">Meeting</option>
//                         <option value="3">Admin</option>
//                     </select>
//                 </div>

//                 {/* Add the Hours the Task takes */}
//                 <div className="form-group col-md-3">
//                     <label htmlFor="taskHours">Hours</label>
//                     <input
//                         name="taskHours"
//                         className="form-control"
//                         type="number"
//                         value={hours}
//                         onChange={(e) => setHours(+e.target.value)} />
//                 </div>
//             </div>

//             <div className="row marginTop10">
//                 {/* Add the Time of Day the Task taks place */}
//                 <div className="form-group col-md-3 marginTop10">
//                     <label htmlFor="taskTime">Time</label>
//                     <input
//                         name="taskTime"
//                         className="form-control"
//                         type="time"
//                         value={time}
//                         onChange={(e) => setTime(e.target.value)} />
//                 </div>

//                 {/* Indicate whether this is a Recurring or a One-Off Task */}
//                 <div className='col-md-3 marginTop20'>
//                     <label>
//                         <input
//                             type="checkbox"
//                             className="form-check-input"
//                             checked={recurring}
//                             onChange={(e) => setRecurring(e.target.checked)} />
//                         {' '}
//                         Recurring Task
//                     </label>
//                 </div>

//                 {/* Display the Dynamic UI element which collects information about when the Task takes place */}
//                 {whenIsTaskUI}
//             </div>

//             {/* Button to Add a new Task */}
//             <div className="row marginTop10">
//                 <div className='col-md-6'>
//                     <span className="errorMSG">{errorMSG}</span>
//                 </div>
//                 <div className='col-md-3'>
//                     <button type="button" className="btn btn-primary marginTop10" onClick={addNewTask}>Add Task</button>
//                 </div>
//             </div>
//         </form >
//     );
// }