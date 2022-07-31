import React from 'react';
import formatRelative from 'date-fns/formatRelative';
import { Avatar, Typography } from 'antd';
import classnames from 'classnames/bind';
import styles from '../MessageBoard/MessageBoard.module.scss';
const cx = classnames.bind(styles);
const { Text } = Typography;
function formatDate(seconds) {
    let formattedDate = '';
    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
}
export default function Message({ text, displayName, createAt, photoURL }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <Avatar size={'small'} className={cx('avatar')} src={photoURL}>
                    {displayName}
                </Avatar>
                <Text className={cx('name')}>{displayName}</Text>
                <Text className={cx('date')}>{formatDate(createAt)}</Text>
            </div>
            <div>
                <Text className={cx('text')}>{text}</Text>
            </div>
        </div>
    );
}
