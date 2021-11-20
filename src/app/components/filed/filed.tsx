import React, { FC } from 'react';

interface Props {
    type?: string,
    onChange: (event:React.ChangeEvent<HTMLInputElement> ) => void,
    value?: string | undefined ,
    placeholder?: string,
    name?:string
}

export const Field: FC<Props> = React.memo(({onChange, type, value, placeholder, name}) => {
        return (
            <input name={name} className={'field'} onChange={onChange} type={type} value={value} placeholder={placeholder}>
            </input>
        );
    }
)
