import React, {FC} from 'react';
import {IProduct} from "../../types";
import {Card} from "../card/card";
import {Button} from "../../../../components/button/button";
import './list.sass'

interface Props {
    tittle: string,
    list: IProduct[],
    buttonClick?: (id: number) => void,
    buttonText?: string,
    removeItem?: (id: number) => void,
    removeText?: string
}


export const List: FC<Props> = React.memo(({list, tittle, buttonText, buttonClick, removeItem, removeText}) => {
        return (
            <div className={'list'}>
                <h1>{tittle}</h1>
                {
                    list.map(item =>
                        <div className={'itemCard'} key={item.id}>
                            <Card item={item}/>
                            {removeItem && removeText &&
                            <Button removeText={removeText} remove={() => removeItem(item.id)}/>
                            }
                            {buttonClick && buttonText &&
                            <Button onSubmit={() => buttonClick(item.id)} text={buttonText}/>}
                        </div>
                    )
                }
            </div>
        );
    }
)

