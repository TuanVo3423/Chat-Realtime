import { Row, Col, Button, Typography } from 'antd';
import firebase, { auth } from '../../firebase/config';
import React from 'react';
import { addDocument, generateKeywords } from '../../firebase/services';
import classNames from 'classnames/bind';
import styles from './login.module.scss';
const cx = classNames.bind(styles);
let fbProvider = new firebase.auth.FacebookAuthProvider();

export default function Login() {
    const handleFbLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
        // check newbie to add info into the db
        if (additionalUserInfo.isNewUser) {
            // collection , in firebase It means table in sql server
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName),
            });
        }
    };
    return (
        <Row justify="center" style={{ height: 800 }}>
            <Col span={8}>
                <Typography.Title level={3} className={cx('title')}>
                    Chào mừng đến với myChat
                </Typography.Title>
                <Button className={cx('btn-gg')}>Đăng nhập với Google</Button>
                <Button onClick={handleFbLogin} className={cx('btn-fb')}>
                    Đăng nhập với Facebook
                </Button>
            </Col>
        </Row>
    );
}