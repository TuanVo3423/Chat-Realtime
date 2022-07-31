import React, { useContext, useMemo } from 'react';
import { Collapse, Typography, Button } from 'antd';
import classNames from 'classnames/bind';
import styles from '../../../Sidebar/SideBar.module.scss';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../../../../../../context/AppProvider';
const cx = classNames.bind(styles);
const { Panel } = Collapse;
export default function RoomList() {
    // {
    //   name : 'room 1',
    //   des : 'phong so 1',
    //   members : 'uid'
    // }

    // const {user : { uid }} = useContext(AuthContext)
    // const roomCondition = useMemo(() => {
    //   return {
    //     fieldName : 'members',
    //     operators : 'array-contains',
    //     compareValue : uid,
    //   }
    // },[uid])
    const { rooms, setShowModal, setSelectedRoomId } = useContext(AppContext);
    // console.log(rooms, selectedRoomId);
    const handleClick = () => {
        setShowModal(true);
    };

    return (
        <Collapse ghost defaultActiveKey={[1]}>
            <Panel className={cx('roomlist-title')} header="Danh sách các phòng" key={1}>
                <div className={cx('room-list')}>
                    {rooms.map((room) => (
                        <Typography.Link
                            onClick={() => setSelectedRoomId(room.id)}
                            key={room.id}
                            className={cx('room-item')}
                        >
                            {room.name}
                        </Typography.Link>
                    ))}
                    <Button onClick={handleClick} icon={<PlusSquareOutlined />} ghost className={cx('btn-add-room')}>
                        Thêm phòng
                    </Button>
                </div>
            </Panel>
        </Collapse>
    );
}
