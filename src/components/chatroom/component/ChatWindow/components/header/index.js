import { UserAddOutlined } from '@ant-design/icons';
import { Button, Avatar, Tooltip, Alert } from 'antd';
import classnames from 'classnames/bind';
import { useContext, memo } from 'react';
import { AppContext } from '../../../../../../context/AppProvider';
import styles from '../header/header.module.scss';
const cx = classnames.bind(styles);

function Header({ roomCurrent, users }) {
    const { setShowInvite } = useContext(AppContext);
    return (
        <>
            {roomCurrent ? (
                <div className={cx('wrapper')}>
                    <div className={cx('left')}>
                        <p>{roomCurrent.name}</p>
                        <span>{roomCurrent.description}</span>
                    </div>
                    <div className={cx('right')}>
                        <Button onClick={() => setShowInvite(true)} type="text" icon={<UserAddOutlined />}>
                            Mời
                        </Button>
                        <Avatar.Group size={'small'} maxCount={2}>
                            {users.map((user) => (
                                <Tooltip
                                    placement="bottomLeft"
                                    arrowPointAtCenter
                                    key={user.id}
                                    title={user.displayName}
                                >
                                    <Avatar src={user.photoURL}>
                                        {user.photoURL ? ' ' : user.displayName?.charAt(0)?.toUpperCase()}
                                    </Avatar>
                                </Tooltip>
                            ))}
                        </Avatar.Group>
                    </div>
                </div>
            ) : (
                <Alert showIcon closable message="Hãy chọn phòng" type="info" />
            )}
        </>
    );
}
export default memo(Header);
