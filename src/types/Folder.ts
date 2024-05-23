import { ID } from './misc'

export type Folder = {
    id: ID,
    name: string
}

export type FolderUpdate = Partial<Folder> & { id: ID }

export type FolderCreate = Omit<Folder, 'id'>