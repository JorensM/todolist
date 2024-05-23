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

export default function HomePage() {

    //-- State --//
    const todoItemsStore = useTodoItemsStore();
    const foldersStore = useFoldersStore();

    const filteredTodoItems = todoItemsStore.todoItems.filter(item => item.folder == foldersStore.selected);

    //-- Handlers --//
    const handleTodoFormSubmit = (itemName: string) => {
        todoItemsStore.addTodoItem(
            {
                name: itemName,
                checked: false,
                folder: foldersStore.selected
            }
        )
    }

    const handleItemChange = (item: TodoItem) => {
        todoItemsStore.updateTodoItem(item);
    }

    const handleItemDelete = (item: TodoItem) => {
        todoItemsStore.deleteTodoItem(item);
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

    return (
        <div className='flex flex-col h-full p-2'>
            <div className='overflow-x-auto py-1'>
                <FoldersList
                    folders={foldersStore.items}
                    selectedFolder={foldersStore.selected}
                    onFolderEdit={handleFolderEdit}
                    onFolderSelect={handleFolderSelect}
                    onFolderCreate={handleFolderCreate}
                />
            </div>
            <h1>{foldersStore.getSelected().name}</h1>
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