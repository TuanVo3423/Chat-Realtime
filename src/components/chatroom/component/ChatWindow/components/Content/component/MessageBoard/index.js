import React, { useContext, useEffect, useMemo, useRef } from 'react';
import Message from './Message';
import classNames from 'classnames/bind';
import styles from './MessageBoard.module.scss';
import useFileStore from '../../../../../../../../hooks/useFileStore';
import { AppContext } from '../../../../../../../../context/AppProvider';
const cx = classNames.bind(styles);

export default function MessageBoard() {
    const { selectedRoom } = useContext(AppContext);
    const messageListRef = useRef(null);
    // selectedRoom kh co ne
    const condition = useMemo(() => {
        if (selectedRoom) {
            console.log(selectedRoom);
            return {
                fieldName: 'roomId',
                operators: '==',
                compareValue: selectedRoom.id,
            };
        }
    }, [selectedRoom]);
    let messages = useFileStore('messages', condition);
    // console.log('condition trong mess', condition);
    useEffect(() => {
        // scroll to bottom after message changed
        if (messageListRef?.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50;
        }
    }, [messages]);

    console.log({ messages, condition });

    return (
        <div className={cx('wrap-messages')} ref={messageListRef}>
            {messages.map((mes) => (
                <Message
                    key={mes.id}
                    text={mes.text}
                    displayName={mes.displayName}
                    createAt={mes.createdAt?.seconds}
                    photoURL={mes.photoURL}
                />
            ))}
        </div>
    );
}
