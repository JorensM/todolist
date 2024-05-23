// Core
import { FormEvent, useState } from 'react'
import clsx from 'clsx';

// Components
import { Input } from '#/components/input/Input';
import { Button } from '#/components/input/Button';

type NewTodoFormProps = {
    onSubmit: (itemName: string) => void
    className?: string
}

export default function NewTodoForm( { onSubmit, className }: NewTodoFormProps) {

    const [nameInputValue, setNameInputValue] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(nameInputValue);
        setNameInputValue('');
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={clsx('flex items-center gap-2 w-full', className)}
        >
            <Input 
                onChange={(e) => setNameInputValue(e.target.value)} 
                value={nameInputValue}
                required
                className='flex flex-grow'
            />
            <Button
                size='sm'
            >
                Create Todo
            </Button>
        </form>
    )
}