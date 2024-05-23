// Core
import { create } from 'zustand';

// Types
import { Folder, FolderCreate } from '#/types/Folder';
import { ID } from '#/types/misc';
import { AbstractDataStoreSlice } from './abstractDataStore';

// State
import createAbstractDataStoreSlice from './abstractDataStore';

type FoldersStore = AbstractDataStoreSlice<Folder> & {
    selected: ID
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
        ...a
    ),
    selected: 1,
    select: (id: ID) => a[0]((state) => ({
        selected: id
    })),
    getSelected: () => a[1]().items.find(item => item.id == a[1]().selected) as Folder
}));

export default useFoldersStore;