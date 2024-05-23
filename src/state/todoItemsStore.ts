import { TodoItem, TodoItemUpdate, TodoItemCreate } from '#/types/TodoItem'
import { ID } from '#/types/misc';
import { create } from 'zustand'

let maxID = 0;

type TodoItemsStore = {
    todoItems: TodoItem[],
    setTodoItem: (item: TodoItem) => void,
    addTodoItem: (item: TodoItemCreate) => void,
    updateTodoItem: (item: TodoItemUpdate) => void,
    deleteTodoItem: (item: TodoItemUpdate) => void
}

const getItemByID = <T extends { id: ID }>(allItems: T[], itemID: ID) => {
    const index = allItems.findIndex(item => item.id == itemID);
    const item = allItems[index];

    return { item, index }
}

const getItemID = (item: ID | { id: ID }) => {
    if(typeof item == 'object') {
        return item.id
    } else {
        return item;
    }
}

const useTodoItemsStore = create<TodoItemsStore>((set) => ({
    todoItems: [],
    addTodoItem: (item: TodoItemCreate) => set((state) => ({
        todoItems: [
            ...state.todoItems,
            {
                ...item,
                id: maxID++
            }
        ]
    })),
    setTodoItem: (item: TodoItem) => set((state) => {
        const newTodoItems = [...state.todoItems];
        const itemIndex = newTodoItems.findIndex(_item => _item.id == item.id);
        newTodoItems[itemIndex] = item;
        return {
            todoItems: newTodoItems
        }
    }),
    updateTodoItem: (item: TodoItemUpdate) => set((state) => {
        //const itemIndex = state.todoItems.findIndex(_item => _item.id == item.id);
        //const oldItem = state.todoItems[itemIndex];

        const { item: oldItem, index: itemIndex } = getItemByID(state.todoItems, item.id);
        if(!oldItem) {
            throw new Error('Could not find item with ID' + item.id);
        }
        const newTodoItems = [...state.todoItems];
        newTodoItems[itemIndex] = {
            ...oldItem,
            ...item
        }
        return {
            todoItems: newTodoItems
        };
    }),
    deleteTodoItem: (item: TodoItemUpdate | ID) => set((state) => {
        const id = getItemID(item);
        const { item: newItem, index: itemIndex } = getItemByID(state.todoItems, id);
        const newTodoItems = [...state.todoItems];
        if(newItem.folder == 0) {
            newTodoItems.splice(itemIndex, 1);
        } else {
            newItem.folder = 0;
            newTodoItems[itemIndex] = newItem;
        }
        return {
            todoItems: newTodoItems
        }
    })
}))

export default useTodoItemsStore;