import React, { useContext, useState } from 'react';
import { Form, Input, Button } from 'antd';
import classNames from 'classnames/bind';
import styles from './FormInput.module.scss';
import { addDocument } from '../../../../../../../../firebase/services';
import { AuthContext } from '../../../../../../../../context/AuthProvider';
import { AppContext } from '../../../../../../../../context/AppProvider';
const cx = classNames.bind(styles);

export default function FormInput() {
    const [form] = Form.useForm();
    const [inputValue, setInputValue] = useState('');
    const {
        user: { uid, photoURL, displayName },
    } = useContext(AuthContext);
    const { selectedRoom } = useContext(AppContext);
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleOnSubmit = () => {
        addDocument('messages', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectedRoom.id,
            displayName,
        });

        form.resetFields(['messages']);
    };
    return (
        <div>
            <Form form={form} className={cx('wrapper')}>
                <Form.Item name={'messages'} className={cx('wrap-input')}>
                    <Input
                        onChange={handleInputChange}
                        onPressEnter={handleOnSubmit}
                        placeholder="Nhập tin nhắn..."
                        className={cx('input')}
                    />
                </Form.Item>
                <Button onClick={handleOnSubmit} className={cx('btn-send')}>
                    Gửi
                </Button>
            </Form>
        </div>
    );
}
