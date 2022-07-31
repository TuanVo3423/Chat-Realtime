import React, { useContext, useMemo, useState } from 'react';
import { createContext } from 'react';
import useFileStore from '../hooks/useFileStore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [showModal, setShowModal] = useState(false);
    const [showInvite, setShowInvite] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');

    const {
        user: { uid },
    } = useContext(AuthContext); // null in the first

    // console.log('user : ', uid);
    const roomCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operators: 'array-contains',
            compareValue: uid,
        };
    }, [uid]);
    // console.log('roomCondition', roomCondition);
    const rooms = useFileStore('rooms', roomCondition);
    const selectedRoom = useMemo(() => rooms.find((room) => room.id === selectedRoomId), [rooms, selectedRoomId]);
    // userCondition : kiểm tra xem trong room đang được select hiện tại có thành viên là user hiện tại không
    // {
    //     fieldName : uid,
    //     operator : in,
    //     compareValue : rooms.members
    // }
    // Loof trong bảng user
    const userCondition = useMemo(() => {
        if (selectedRoom) {
            return {
                fieldName: 'uid', //uid người dùng
                operators: 'in',
                compareValue: selectedRoom.members, // list các uid trong room
            };
        }
    }, [selectedRoom]);
    const users = useFileStore('users', userCondition);
    // console.log('users', users, userCondition);

    // reset
    const clearState = () => {
        setSelectedRoomId('');
        setShowModal(false);
        setShowInvite(false);
    };

    return (
        <AppContext.Provider
            value={{
                rooms,
                showModal,
                setShowModal,
                selectedRoomId,
                setSelectedRoomId,
                selectedRoom,
                users,
                showInvite,
                setShowInvite,
                clearState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
