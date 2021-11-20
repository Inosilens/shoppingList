import React from 'react';
import './notification.sass'
import {useAppSelector} from "../../hooks/redux-hooks";


export const Notification = React.memo(() => {
        const {notification} = useAppSelector(state => state.main)
        return (
            <div className={notification.show ? 'wrapper' : ''}>
                <div className={notification.type}>
                    <p>{notification.text}</p>
                </div>
            </div>

        );
    }
)

