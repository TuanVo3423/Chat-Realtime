import { Alert, Avatar, Form, Modal, Select, Spin } from 'antd';
import { debounce } from 'lodash';

import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../context/AppProvider';
import { db } from '../../firebase/config';

function DebounceSelect({ fetchValue, delay = 300, currUser, ...props }) {
    // cờ để check xem có đang lấy dữ liệu từ database không?
    const [fetching, setFetching] = useState(false);
    const [Value, setValue] = useState([]);
    const debouncedFetcher = useMemo(() => {
        const loadValue = (value) => {
            // value la text khi ban typing
            setValue([]);
            setFetching(true); // dang call api
            fetchValue(value, currUser).then((newValue) => {
                setValue(newValue);
                setFetching(false);
            });
        };
        return debounce(loadValue, delay);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchValue, delay]);
    return (
        <Select
            filterOption={false}
            onSearch={debouncedFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {Value.map((data) => (
                <Select.Option key={data.value} value={data.value} title={data.label}>
                    <Avatar src={data.photoURL} size={'small'}>
                        {data.photoURL ? '' : data.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${data.label}`}
                </Select.Option>
            ))}
        </Select>
    );
}
async function fetchUserList(search, currUser) {
    if (currUser) {
        // console.log('currUser', currUser);
        return db
            .collection('users')
            .where('keywords', 'array-contains', search)
            .limit(20)
            .get()
            .then((snapshot) => {
                return snapshot.docs
                    .map((doc) => ({
                        label: doc.data().displayName,
                        value: doc.data().uid,
                        photoURL: doc.data().photoURL,
                    }))
                    .filter((option) => !currUser.includes(option.value)); // loại bỏ trùng lặp account thông qua members uid
            });
    }
}
export default function InviteUserModals() {
    const [value, setValue] = useState([]); // value when you select option suggested
    const [form] = Form.useForm(); // get the value of the form
    const { setShowInvite, showInvite, selectedRoomId, selectedRoom } = useContext(AppContext); // toggle modal

    const handleInviteUser = () => {
        // Update db
        const roomRef = db.collection('rooms').doc(selectedRoomId);
        // console.log('selectedRoom.members', selectedRoom.members);
        // console.log('selectedRoomId', selectedRoomId);
        roomRef.update({
            members: [...selectedRoom.members, ...value.map((val) => val)],
        });
        form.resetFields();
        setShowInvite(false);
    };
    const handleCancel = () => {
        form.resetFields();
        setShowInvite(false);
    };

    return (
        <div>
            <Modal title={'Mời thêm thành viên'} visible={showInvite} onOk={handleInviteUser} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        label="Tên các thành viên"
                        value={value}
                        placeholder="Nhập tên thành viên"
                        fetchValue={fetchUserList} // call api and return to the promise
                        onChange={(newValue) => {
                            setValue(newValue);
                        }} // chọn ra các select được gợi ý
                        style={{ width: '100%' }}
                        currUser={selectedRoom ? selectedRoom.members : []}
                    />
                </Form>
            </Modal>
        </div>
    );
}
