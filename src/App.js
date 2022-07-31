import Login from './components/login';
import ChatRoom from './components/chatroom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import AppProvider from './context/AppProvider';
import AddRomModal from './components/Modals/AddRomModal';
import InviteUserModals from './components/Modals/InviteUserModals';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppProvider>
                    <Routes>
                        <Route element={<Login />} path="/login" />
                        <Route element={<ChatRoom />} path="/" />
                    </Routes>
                    <AddRomModal />
                    <InviteUserModals />
                </AppProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
