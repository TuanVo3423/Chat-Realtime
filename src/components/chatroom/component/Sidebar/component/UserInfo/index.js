import React, { useContext } from 'react';
import { Button, Avatar, Typography } from 'antd';
import { AuthContext } from '../../../../../../context/AuthProvider';
import classNames from 'classnames/bind';
import styles from '../../../Sidebar/SideBar.module.scss';
import { auth } from '../../../../../../firebase/config';
import { AppContext } from '../../../../../../context/AppProvider';
const cx = classNames.bind(styles);

export default function UserInfo() {
    const { clearState } = useContext(AppContext);
    const {
        user: { displayName, photoURL },
    } = useContext(AuthContext);
    console.log('photoURL', photoURL);
    const handleSignOut = () => {
        clearState();
        auth.signOut();
    };
    return (
        <div className={cx('Info-wrapper')}>
            <div className={cx('left-info')}>
                <Avatar referrerPolicy="no-referrer" src={photoURL}>
                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text className={cx('user-name')}>{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={handleSignOut}>
                Đăng xuất
            </Button>
        </div>
    );
}
