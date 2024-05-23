import { Folder } from '#/types/Folder';
import { TodoItem } from '#/types/TodoItem';
import { ID, ItemCreate, ItemUpdate } from '#/types/misc';

export abstract class AbstractCollection<T extends { id: ID }> {

    id: string;

    constructor(collectionID: string) {
        this.id = collectionID;
    }

    abstract getAll(): Promise<T[]>;
    abstract get(id: ID): Promise<T>;
    abstract update(item: ItemUpdate<T>): Promise<boolean>;
    abstract delete(item: ItemUpdate<T> | ID): Promise<boolean>;
    abstract add(item: ItemCreate<T>): Promise<ID>;
    abstract set(item: T): Promise<boolean>;
    abstract setAll(items: T[]): Promise<boolean>;
}

export default class DB {
    folders: AbstractCollection<Folder>;
    items: AbstractCollection<TodoItem>;

    constructor(
        folderCollection: AbstractCollection<Folder>,
        todoItemsCollection: AbstractCollection<TodoItem>
    ) {
        this.folders = folderCollection;
        this.items = todoItemsCollection;
    }
}