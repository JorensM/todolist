// Types
import { ID } from '#/types/misc';

/**
 * Get item in a given list by its `id` property
 * @param allItems All items of the list
 * @param itemID ID of item to retrieve
 * @returns Object with properties `item` and `index`
 */
export const getItemByID = <T extends { id: ID }>(allItems: T[], itemID: ID) => {
    const index = allItems.findIndex(item => item.id == itemID);
    const item = allItems[index];

    return { item, index }
}

/**
 * Get ID of item or item ID
 * @param item item or item ID. 
 * @returns ID
 */
export const getItemID = (item: ID | { id: ID }) => {
    if(typeof item == 'object') {
        return item.id
    } else {
        return item;
    }
}