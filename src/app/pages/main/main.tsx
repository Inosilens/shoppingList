import React, {FC, useState} from 'react';
import {Modal} from "../../components/modal/modal";
import {Field} from "../../components/filed/filed";
import {Button} from "../../components/button/button";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {List} from "./components/list/list";
import {IProduct} from "./types";
import {addProduct, addToBasket, buyProduct, removeProduct, hideNotification} from "./main-slice";
import './main.sass'
import {Notification} from "../../components/notification/notification";

type dispatchEventOptions = {
    [key: string]: any
}

const Main: FC = () => {
    const {shoppingList, allProducts, notification} = useAppSelector(state => state.main)
    const [newProduct, setNewProduct] = useState<IProduct>({
        id: 0, img: undefined, optionalTittle: "", price: "", tittle: ""
    })
    const [createMode, setCreateMode] = useState<boolean>(false)
    const dispatch = useAppDispatch();

    const createProduct = () => {
        dispatch(addProduct(newProduct))
        setNewProduct({id: 0, img: undefined, optionalTittle: "", price: "", tittle: ""})
        setCreateMode(false)
        setTimeout(() => {
            dispatch(hideNotification())
        }, 4000)
    }

    const productEvent = (id: number, type: keyof typeof switchEvent) => {
        const switchEvent: dispatchEventOptions = {
            'addToBasket': addToBasket(id),
            'removeProductOnList': removeProduct(id),
            'removeOnBasket': buyProduct(id),
        }
        dispatch(switchEvent[type])
        setTimeout(() => {
                dispatch(hideNotification())
            }, 4000)

    }

    const getProductImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        let file = e.currentTarget.files![0]
        let reader = new FileReader();
        reader.onloadend = function () {
            setNewProduct((prevState) => ({
                ...prevState,
                img: reader.result,
            }))
        };
        reader.readAsDataURL(file);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewProduct((prevState) => ({
            ...prevState,
            [name]: value,
            id: Math.random()
        }));
    };

    return (
        <>
            <Notification notificationType={notification.type}
                          notificationText={notification.text}
                          notificationShow={notification.show}/>
            <div className={'header'}>
                <Button onSubmit={() => setCreateMode(true)}
                        type={'create'}
                        text={'C???????????? ??????????????'}/>
            </div>
            <div className={'listBlock'}>
                <List tittle={'????????????????'}
                      list={allProducts}
                      buttonClick={(id) => productEvent(id, 'addToBasket')}
                      removeText={'?????????????? ??????????????'}
                      removeItem={(id) => productEvent(id, 'removeProductOnList')}
                      buttonText={'???????????????? ?? ???????????? ??????????????'}/>
                <List tittle={'???????????? ??????????????'}
                      list={shoppingList}
                      buttonClick={(id) => productEvent(id, 'removeOnBasket')}
                      buttonText={'????????????'}/>
            </div>
            {createMode &&
            <Modal tittle={'???????????????? ????????????????'}
                   onSubmit={() => createProduct()}
                   onDisagree={() => setCreateMode(false)}
                   textDisagree={'????????????'} textSubmit={'??????????????????'}
                   disabled={!newProduct.tittle.length || !newProduct.price.length || !newProduct.img}
            >
                <label>???????????????? ????????????????</label>
                <Field value={newProduct.tittle}
                       onChange={(e) => {
                           handleChange(e)
                       }}
                       type={'text'}
                       name={'tittle'}
                       placeholder={"?????????????? ????????????????"}/>
                <label>???????? ????????????????</label>
                <Field value={newProduct.price}
                       onChange={(e) => handleChange(e)}
                       type={'text'}
                       placeholder={"?????????????????? ????????????????"}
                       name={'price'}/>
                <label>?????????????????????? ????????????????</label>
                <Field onChange={(e) => getProductImage(e)}
                       type={'file'}/>
                <label>???????????????? ????????????????(??????????????????????)</label>
                <Field value={newProduct.optionalTittle} onChange={(e) => handleChange(e)}
                       type={'text'} name={'optionalTittle'}/>
            </Modal>}
        </>
    );
};

export default Main;