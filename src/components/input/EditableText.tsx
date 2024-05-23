import clsx from 'clsx';
import { ChangeEvent, KeyboardEvent, ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import { Input } from './Input';

type EditableTextProps = {
    text: string, // The text to display
    onChange: (newText: string) => void, // On input change. Gets called after 'confirmation', that is when the field is deselected
    className?: string, // class for the wrapper element
    textClassName?: string, // class for the text element
    disabled?: boolean // Whether the field is disabled. If disabled, won't be able to enter edit mode,
    enableCooldown?: number // How long after re-enabling the component should it become editable again
}

/**
 * Basic abstract function for handling key presses
 * @param event keyboard event
 * @param codes Array of codes that should be checked
 * @param handler Handler that gets called if the event has any of the keys from `codes` arg
 */
const handleKeyPress = (event: KeyboardEvent, codes: string[], handler: () => void) => {
    if(codes.includes(event.code)) {
        handler();
    }
}

/**
 * Editable text. Acts as regular text unless clicked on, in which case it turns into
 * an editable text input. 
 */
export default function EditableText( { text, onChange, className, textClassName, disabled = false, enableCooldown = 0 }: EditableTextProps){

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(text);
    const inputRef = useRef<HTMLInputElement>(null);
    const textContainerRef = useRef<HTMLElement>(null);

    const [isEnableCooldownDone, setIsEnableCooldownDone] = useState<boolean>(true);

    const internalDisabled = disabled || !isEnableCooldownDone;

    const handleTextClick = () => {
        if(!isEditing && !internalDisabled) setIsEditing(true);
    }

    const handleInputBlur = () => {
        setIsEditing(false);
        onChange(inputValue);
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        if(isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing])

    useEffect(() => {
        if(!disabled) {
            setIsEnableCooldownDone(false);
            setTimeout(() => {
                setIsEnableCooldownDone(true);
            }, enableCooldown)
        }
    }, [disabled])

    return (
        <span className={clsx('flex h-8', className)}>
            {isEditing && !internalDisabled ?
                <Input 
                    type='text' 
                    onBlur={handleInputBlur}
                    onChange={handleInputChange}
                    value={inputValue}
                    ref={inputRef}
                    onKeyUp={(e) => handleKeyPress(e, ['Enter'], handleInputBlur)}
                />
            :
                <span 
                    className={clsx('flex w-full h-full rounded-sm items-center focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-ring', textClassName)} 
                    onClick={handleTextClick}
                    onKeyUp={(e) => handleKeyPress(e, ['Enter'], handleTextClick)}
                    tabIndex={internalDisabled ? -1 : 0}
                    ref={textContainerRef}
                >
                    {text}
                </span>
            }

        </span>
    )
}