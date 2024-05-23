import { ID } from './misc'

export type TodoItem = {
    id: ID,
    name: string,
    checked: boolean,
    folder: ID
}

export type TodoItemCreate = Omit<TodoItem, 'id'>

export type TodoItemUpdate = Partial<TodoItem> & { id: ID }