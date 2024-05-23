import { ID } from '#/types/misc';
import { StateCreator, create } from 'zustand';

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

let maxID = 10;

type ItemUpdate<T> = Partial<T> & { id: ID };
type ItemCreate<T> = Omit<T, 'id'>;

export type AbstractDataStoreSlice<T extends { id: ID }> = {
    items: T[],
    add: (item: ItemCreate<T>) => void
    set: (item: T) => void
    update: (item: ItemUpdate<T>) => void
    delete: (item: ItemUpdate<T> | ID) => void
}

type StateSetter<State> = (setter: (state: State) => Partial<State>) => void

export default function createAbstractDataStoreSlice<T extends { id: ID}>
(
    initial: T[],
    _set: StateSetter<AbstractDataStoreSlice<T>>,
    ...a: any[]
): 
AbstractDataStoreSlice<T>
{   
    return ({
        items: initial,
        add: (item: ItemCreate<T>) => _set((state) => {
            const newItem = {
                ...item,
                id: maxID++
            } as T;
            return {
                items: [
                    ...state.items,
                    newItem
                ]
            }
        }),
        set: (item: T) => _set((state) => {
            const newItems = [...state.items];
            const itemIndex = newItems.findIndex(_item => _item.id == item.id);
            newItems[itemIndex] = item;
            return {
                items: newItems
            }
        }),
        update: (item: ItemUpdate<T>) => _set((state) => {
            //const itemIndex = state.todoItems.findIndex(_item => _item.id == item.id);
            //const oldItem = state.todoItems[itemIndex];

            const { item: oldItem, index: itemIndex } = getItemByID(state.items, item.id);
            if(!oldItem) {
                throw new Error('Could not find item with ID' + item.id);
            }
            const newItems = [...state.items];
            newItems[itemIndex] = {
                ...oldItem,
                ...item
            }
            return {
                items: newItems
            };
        }),
        delete: (item: ItemUpdate<T> | ID) => _set((state) => {
            const id = getItemID(item);
            const { index: itemIndex } = getItemByID(state.items, id);
            const newItems = [...state.items];
            newItems.splice(itemIndex, 1);
            return {
                items: newItems
            }
        })
    });
}