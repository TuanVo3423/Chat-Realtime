import { auth } from '../firebase/config';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { createContext } from 'react';
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const history = useNavigate();
    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({
                    displayName,
                    email,
                    uid,
                    photoURL,
                });
                setIsLoading(false);
                history('/');
                return;
            } else {
                setUser({});
                history('/login');
                setIsLoading(false);
            }
        });
        return () => {
            unsubscribed();
        };
    }, [history]);
    return <AuthContext.Provider value={{ user }}>{isLoading ? <Spin /> : children}</AuthContext.Provider>;
}
