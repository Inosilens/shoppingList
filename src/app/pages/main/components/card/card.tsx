import React from 'react';
import {IProduct} from "../../types";
import './card.sass'

interface Props {
    item: IProduct
}

export const Card = React.memo(({item}: Props) => {
        return (
            <div className={'card'}>
                <div className="tittle">
                    <h2>{item.tittle}</h2>
                </div>
                <div className="price">
                    Цена  {item.price}
                </div>
                {item.img &&
                <div className="img">
                    <img src={String(item.img)} width={'200px'} height={'200px'} alt={'product'}/>
                </div>}
                <div>
                    {item.optionalTittle}
                </div>

            </div>
        );
    }
)

