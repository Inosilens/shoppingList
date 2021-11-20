import React, { FC } from 'react';
import './modal.sass'
import {Button} from "../button/button";


interface Props {
    tittle: string,
    children: React.ReactNode,
    onSubmit?: () => void,
    onDisagree?: () => void,
    textSubmit?: string,
    textDisagree?: string,
    disabled?: boolean
}

export const Modal: FC<Props> = React.memo(({
                                     tittle,
                                     children,
                                     onSubmit,
                                     onDisagree,
                                     textSubmit,
                                     textDisagree,
                                     disabled
                                 }) => {
        return (
            <div className={'modalWrapper'}>
                <div className={'window'}>
                    <h3>{tittle}</h3>
                    {children}
                    {onSubmit && textSubmit && <Button type={'submit'} onSubmit={onSubmit} disabled={disabled} text={textSubmit}/>}
                    {onDisagree && textDisagree && <Button type={'chancel'} onSubmit={onDisagree} text={textDisagree}/>}
                </div>
            </div>
        );
    }
)

