// Core
import { MouseEvent } from 'react'
import clsx from 'clsx'

// Components
import { Button } from '#/components/input/Button'
import EditableText from '#/components/input/EditableText'

// TYpes
import { Folder, FolderUpdate } from '#/types/Folder'
import { ID } from '#/types/misc'
import { Plus } from 'lucide-react'

type FoldersListProps = {
    folders: Folder[],
    selectedFolder?: ID,
    onFolderSelect: (folder: Folder) => void
    onFolderEdit: (updatedFolder: FolderUpdate) => void
    onFolderCreate: () => void
}

export default function FoldersList({ 
    folders, 
    selectedFolder, 
    onFolderEdit, 
    onFolderSelect,
    onFolderCreate
}: FoldersListProps) {

    const onFolderNameChange = (folder: Folder, name: string) => {
        onFolderEdit({
            ...folder,
            name
        })
    }

    const handleFolderButtonClick = (e: MouseEvent<HTMLButtonElement>, folder: Folder) => {
        e.stopPropagation();
        onFolderSelect(folder)
    }
    return(
        <ul className='flex gap-1'>
            {folders.map(folder => (
                <li key={folder.id}>
                    <Button
                        variant='ghost'
                        className={clsx(
                            folder.id == 0 && 'text-destructive',
                            folder.id == selectedFolder && 'underline'
                        )}
                        onClick={(e) => handleFolderButtonClick(e, folder)}
                    >
                        <EditableText
                            text={folder.name}
                            onChange={(name) => onFolderNameChange(folder, name)}
                            disabled={folder.id !== selectedFolder}
                            enableCooldown={20}
                        />
                    </Button>
                </li>
            ))}
            <li>
                <Button
                    variant='ghost'
                    size='icon'
                    onClick={onFolderCreate}
                >
                    <Plus className='h-4 w-4' />
                </Button>
            </li>
        </ul>
    )
}