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
                        text={'Cоздать продукт'}/>
            </div>
            <div className={'listBlock'}>
                <List tittle={'Продукты'}
                      list={allProducts}
                      buttonClick={(id) => productEvent(id, 'addToBasket')}
                      removeText={'Удалить продукт'}
                      removeItem={(id) => productEvent(id, 'removeProductOnList')}
                      buttonText={'Добавить в список покупок'}/>
                <List tittle={'Список покупок'}
                      list={shoppingList}
                      buttonClick={(id) => productEvent(id, 'removeOnBasket')}
                      buttonText={'Купить'}/>
            </div>
            {createMode &&
            <Modal tittle={'Создание продукта'}
                   onSubmit={() => createProduct()}
                   onDisagree={() => setCreateMode(false)}
                   textDisagree={'Отмена'} textSubmit={'Сохранить'}
                   disabled={!newProduct.tittle.length || !newProduct.price.length || !newProduct.img}
            >
                <label>Название продукта</label>
                <Field value={newProduct.tittle}
                       onChange={(e) => {
                           handleChange(e)
                       }}
                       type={'text'}
                       name={'tittle'}
                       placeholder={"Введите название"}/>
                <label>Цена продукта</label>
                <Field value={newProduct.price}
                       onChange={(e) => handleChange(e)}
                       type={'text'}
                       placeholder={"Поставьте стомость"}
                       name={'price'}/>
                <label>Изображение продукта</label>
                <Field onChange={(e) => getProductImage(e)}
                       type={'file'}/>
                <label>Описание продукта(опционально)</label>
                <Field value={newProduct.optionalTittle} onChange={(e) => handleChange(e)}
                       type={'text'} name={'optionalTittle'}/>
            </Modal>}
        </>
    );
};

export default Main;