import React from 'react';
import './notification.sass'

interface Props {
    notificationType : string,
    notificationText : string,
    notificationShow : boolean
}


export const Notification = React.memo(({notificationText,notificationType, notificationShow}:Props) => {
        return (
            <div className={notificationShow?'wrapper':''}>
                <div className={notificationType}>
                    <p>{notificationText}</p>
                </div>
            </div>

        );
    }
)

