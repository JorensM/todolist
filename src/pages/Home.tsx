// Core

// Components
import FoldersList from '#/components/lists/FoldersList';
import TodoList from '#/components/lists/TodoList';
import NewTodoForm from '#/components/misc/NewTodoForm';

// State
import useFoldersStore from '#/state/foldersStore';
import useTodoItemsStore from '#/state/todoItemsStore';

// Types
import { TodoItem } from '#/types/TodoItem';
import { Folder, FolderUpdate } from '#/types/Folder';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#/components/input/DropdownMenu';
import { EllipsisVertical } from 'lucide-react';

export default function HomePage() {

    //-- State --//
    const todoItemsStore = useTodoItemsStore();
    const foldersStore = useFoldersStore();

    console.log(todoItemsStore.items);

    const filteredTodoItems = todoItemsStore.items.filter(item => item.folder == foldersStore.selected);

    //-- Handlers --//
    const handleTodoFormSubmit = (itemName: string) => {
        if(!foldersStore.selected) throw new Error('No folder selected');
        todoItemsStore.add(
            {
                name: itemName,
                checked: false,
                folder: foldersStore.selected
            }
        )
    }

    const handleItemChange = (item: TodoItem) => {
        console.log('item changed:', item);
        todoItemsStore.update(item);
    }

    const handleItemDelete = (item: TodoItem) => {
        todoItemsStore.moveToTrash(item);
    }
    
    const handleFolderSelect = (folder: Folder) => {
        foldersStore.select(folder.id);
    }

    const handleFolderEdit = (folder: FolderUpdate) => {
        foldersStore.update(folder);
    }

    const handleFolderCreate = () => {
        foldersStore.add({
            name: 'New Folder'
        })
    }

    const handleFolderDelete = (folder: Folder) => {
        foldersStore.delete(folder);
        //if(foldersStore.selected == folder.id) {
        foldersStore.select(foldersStore.items[0].id);
        //}
    }

    return (
        <div className='flex flex-col h-full p-2'>
            <div className='overflow-x-auto py-1'>
                {foldersStore.initialized &&            
                    <FoldersList
                        folders={foldersStore.items}
                        selectedFolder={foldersStore.selected!}
                        onFolderEdit={handleFolderEdit}
                        onFolderSelect={handleFolderSelect}
                        onFolderCreate={handleFolderCreate}
                    />
                }
            </div>
            <div className='flex w-full justify-between'>
                <h1 className='w-fit'>{foldersStore.getSelected()?.name || 'Loading'}</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical
                            className='h-6 w-6'
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                        align='end'
                        className='testaaa'
                    >
                        <DropdownMenuItem
                            onSelect={handleFolderDelete}
                        >
                            Delete Folder
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <TodoList
                items={filteredTodoItems}
                onItemChange={handleItemChange}
                onItemDelete={handleItemDelete}
            />
            <NewTodoForm
                className='mt-auto'
                onSubmit={handleTodoFormSubmit}
            />
        </div>
    )
}