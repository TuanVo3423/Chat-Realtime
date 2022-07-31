import React, { useContext, useMemo } from 'react';
import Content from './components/Content';
import Header from './components/header';
import classNames from 'classnames/bind';
import styles from './Chatwindow.module.scss';
import { AppContext } from '../../../../context/AppProvider';
const cx = classNames.bind(styles);

export default function ChatWindow() {
    const { selectedRoom, users } = useContext(AppContext);
    // console.log(rooms, selectedRoomId);
    // rooms : list cac room
    // selectedRoom chua id cua room duoc chon
    // neu co su thay doi cua room list va selected room thi set lai
    //  day la room dang chon
    // const selectedRoom = useMemo(() => rooms.find((room) => room.id === selectedRoomId), [rooms, selectedRoomId]);
    // const test = rooms.find((room) => room.id === selectedRoomId);
    // console.log('test', test);
    // console.log('room selected', selectedRoom, users);
    return (
        <div className={cx('wrapper')}>
            <Header roomCurrent={selectedRoom} users={users} />
            <Content />
        </div>
    );
}
