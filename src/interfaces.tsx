export interface User {
    name:           string,
    weeklyHours:    number,
}

export enum TaskType {
    none =          0,
	email =         1,
    meeting =       2,
    admin =         3,
    // etc,
}

export interface Group {
    name:           string,
    tasks:          Task[],
}


export interface Task {
    _id:            number,

    task:           string,
    category:       TaskType,

    hours:          number,

    timeHr:         number,
    timeMin:        number,

    recurring:      boolean,
    date?:          Date,       // If one-time, the Date should be set
    weekDays:       number[],   // If recurring, the Week Days should be set
}

export interface TaskSplit {
    header:         string,
    tasks:          Task[],
}