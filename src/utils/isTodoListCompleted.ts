import { TaskType } from "../components/TodoList"
import { isTimeLeft } from "./isTimeLeft"

export const isTodoListCompleted = (targetDate: Date, currentDate: Date, task: Array<TaskType>): boolean | undefined => {
    if (isTimeLeft(targetDate, currentDate) === true) {
        return false
    } else if (task.every(t => t.isDone === true)  
    && task.length > 0) {
        return true
    }
    
}