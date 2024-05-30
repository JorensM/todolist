import { TodoItem } from '#/types/TodoItem'
import { ID, ItemUpdate } from '#/types/misc';
import { getItemByID, getItemID } from '#/util/lists';
import { create } from 'zustand'
import createAbstractDataStoreSlice, { AbstractDataStoreSlice } from './abstractDataStore';
import db from '#/classes/usedDB';

type TodoItemsStore = AbstractDataStoreSlice<TodoItem> & {
    moveToTrash: (item: ItemUpdate<TodoItem> | ID) => void
}

const useTodoItemsStore = create<TodoItemsStore>((set, get) => ({
    ...createAbstractDataStoreSlice<TodoItem>(
        [],
        db.items,
        undefined,
        set
    ),
    moveToTrash: async (item) => {
        const allItems = get().items;
        const id = getItemID(item);
        const { item: newItem } = getItemByID(allItems, id);

        if(newItem.folder == 0) {
            get().delete(newItem);
        } else {
            get().update({
                ...newItem,
                folder: 0
            })
        }

    }
}))

export default useTodoItemsStore;