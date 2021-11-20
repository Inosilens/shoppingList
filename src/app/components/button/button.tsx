import React, { FC } from 'react';
import './button.sass'

interface Props {
    onSubmit?: () => void,
    remove?: () => void,
    removeText?: string,
    text?: string,
    disabled?: boolean
    type?: string
}


export const Button: FC<Props> = React.memo(({text, onSubmit, disabled, type, removeText, remove}) => {
        return (
            <button className={type} onClick={onSubmit ? onSubmit : remove} disabled={disabled}>
                {text}{removeText}
            </button>
        )
    }
)

