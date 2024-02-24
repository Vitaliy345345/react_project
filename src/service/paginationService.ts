import { TodoListType } from "../App"
import { paginationTypes } from "../components/PaginationComponent"

export const service = {
    getData: (todoLists: Array<TodoListType>, {from, to}: paginationTypes) => {
        return new Promise((resolve, reject) => {

            const data = todoLists.slice(from, to)

            resolve({
                count: todoLists.length,
                data: data
            })
        })
    }
}