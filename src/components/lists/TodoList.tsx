// Core
import { X } from 'lucide-react'

// Components
import { Button } from '#/components/input/Button'
import { Checkbox } from '#/components/input/Checkbox'
import EditableText from '#/components/input/EditableText'
import { TodoItem } from '#/types/TodoItem'



type TodoListProps = {
    items: TodoItem[],
    onItemChange: (newItem: TodoItem) => void,
    onItemDelete: (item: TodoItem) => void
}

export default function TodoList( { items, onItemChange, onItemDelete }: TodoListProps ) {

    const onItemNameChange = (item: TodoItem, name: string) => {
        onItemChange({
            ...item,
            name
        })
    }

    const onItemCheckedChange = (item: TodoItem, checked: boolean) => {
        onItemChange({
            ...item,
            checked
        })
    }

    return (
        <ul>
            {items.map((item) => (
                <li 
                    className='flex gap-2 items-center'
                    key={item.id}
                >
                    {/* <input 
                        type='checkbox' 
                        className='mt-0.5'
                        onChange={(e) => onItemCheckedChange(item, e.target.checked)}
                        checked={item.checked}
                    /> */}
                    <Checkbox
                        onCheckedChange={(checked: boolean) => onItemCheckedChange(item, checked)}
                    />
                    <EditableText
                        className='flex flex-grow'
                        textClassName={item.checked ? 'line-through' : undefined}
                        text={item.name}
                        onChange={(newName) => onItemNameChange(item, newName)}
                    />
                    <Button
                        variant='ghost'
                        className='text-destructive'
                        size='icon'
                        onClick={() => onItemDelete(item)}
                    >
                        <X className='h-4 w-4'/>
                    </Button>
                    {/* {item.name} */}
                </li>
            ))}
        </ul>
    )
}