import React, {FC} from 'react';
import {IProduct} from "../../types";
import './card.sass'

interface Props {
    item: IProduct
}

export const Card: FC<Props> = React.memo(({item}) => {
        return (
            <div className={'card'}>
                <div className="tittle">
                    <h2>
                        {item.tittle}
                    </h2>
                </div>
                <div className="price">
                    <h3>
                        Цена : {item.price}
                    </h3>
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

