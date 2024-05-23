// Types
import { AbstractCollection } from '#/classes/DB';
import { ID, ItemCreate, ItemUpdate } from '#/types/misc';
import { getItemByID, getItemID } from '#/util/lists';



export type AbstractDataStoreSlice<T extends { id: ID }> = {
    items: T[],
    add: (item: ItemCreate<T>) => Promise<void>
    set: (item: T) => Promise<void>
    update: (item: ItemUpdate<T>) => Promise<void>
    delete: (item: ItemUpdate<T> | ID) => Promise<void>
    /**
     * Initialize the store by fetching data from database
     * @returns 
     */
    init: () => void
    /**
     * Whether the store has been initialized
     */
    initialized: boolean
}

type StateSetter<State> = (setter: (state: State) => Partial<State>) => void

export default function createAbstractDataStoreSlice<T extends { id: ID}>
(
    initial: T[],
    dbCollection: AbstractCollection<T>,
    onInit: ((items: T[]) => void) | undefined,
    _set: StateSetter<AbstractDataStoreSlice<T>>,
    ...a: any[]
): 
AbstractDataStoreSlice<T>
{   
    return ({
        items: initial,
        initialized: false,
        add: async (item: ItemCreate<T>) => {
            const id = await dbCollection.add(item);
            const newItem = {
                ...item,
                id
            } as T;
            _set((state) => ({
                items: [
                    ...state.items,
                    newItem
                ]
            }))
        },
        set: async (item: T) => {
            await dbCollection.set(item);
            _set((state) => {
                const newItems = [...state.items];
                const itemIndex = newItems.findIndex(_item => _item.id == item.id);
                newItems[itemIndex] = item;
                return {
                    items: newItems
                }
            });
        },
        update: async (item: ItemUpdate<T>) => {
            await dbCollection.update(item);
            
            _set((state) => {
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
            })   
        },
        delete: async (item: ItemUpdate<T> | ID) => {
            await dbCollection.delete(item);
            
            _set((state) => {
                const id = getItemID(item);
                const { index: itemIndex } = getItemByID(state.items, id);
                const newItems = [...state.items];
                newItems.splice(itemIndex, 1);
                return {
                    items: newItems
                }
            });
        },
        init: async () => {

            const items = await dbCollection.getAll();
            
            
            _set(() => {
                return {
                    items
                }
            });

            if(onInit) {
                await onInit(items);
            }

            console.log('initialized');
            console.log('items: ', items);
            _set(() => {
                return {
                    initialized: true
                }
            });
        }
    });
}