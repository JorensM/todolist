// Core
import { create } from 'zustand';

// Types
import { Folder, FolderCreate } from '#/types/Folder';
import { ID } from '#/types/misc';
import { AbstractDataStoreSlice } from './abstractDataStore';

// State
import createAbstractDataStoreSlice from './abstractDataStore';
import db from '#/classes/usedDB';

type FoldersStore = AbstractDataStoreSlice<Folder> & {
    selected: ID | null
    select: (id: ID) => void
    getSelected: () => Folder
}

const useFoldersStore = create<FoldersStore>((...a) => ({
    ...createAbstractDataStoreSlice<Folder>(
        [
            {
                name: 'Trash',
                id: 0
            },
            {
                name: 'Primary',
                id: 1
            }
        ],
        db.folders,
        async (items) => {
            if(!items.length) {
                await db.folders.setAll([
                    {
                        name: 'Trash',
                        id: 0
                    },
                    {
                        name: 'Primary',
                        id: 1
                    }
                ])
                a[1]().init();
            }
            console.log('initializing folders');
            console.log('items: ', items)
            a[0](() => ({selected: items[0].id}));

        },
        ...a
    ),
    selected: null,
    select: (id: ID) => a[0]((state) => ({
        selected: id
    })),
    getSelected: () => a[1]().items.find(item => item.id == a[1]().selected) as Folder
}));

export default useFoldersStore;