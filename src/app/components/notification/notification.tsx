import React, {FC} from 'react';
import './notification.sass'
import {useAppSelector} from "../../hooks/redux-hooks";

interface Props {
    notificationType: string,
    notificationText: string,
    notificationShow: boolean
}

export const Notification: FC<Props> = React.memo(({notificationText, notificationType, notificationShow}) => {
        const {notification} = useAppSelector(state => state.main)
        return (
            <div className={notificationShow ? 'wrapper' : ''}>
                <div className={notificationType}>
                    <p>{notificationText}</p>
                </div>
            </div>
        )
    }
)



