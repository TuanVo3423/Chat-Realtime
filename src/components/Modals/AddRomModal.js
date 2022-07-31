import { Modal, Form, Input } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';
import { AuthContext } from '../../context/AuthProvider';
import { addDocument } from '../../firebase/services';

export default function AddRomModal() {
    const { showModal, setShowModal } = useContext(AppContext);
    const {
        user: { uid },
    } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleSubmit = () => {
        // ABC
        // console.log(form.getFieldValue());
        // add room into database
        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });
        setShowModal(false);
        form.resetFields();
    };
    const handleOnCancel = () => {
        form.resetFields();
        setShowModal(false);
    };
    return (
        <div>
            <Modal title="Tạo phòng" visible={showModal} onOk={handleSubmit} onCancel={handleOnCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item label={'Tên phòng'} name="name">
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label={'Description'} name="description">
                        <Input placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
