import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavBar from './component/MyNavBar'
import AdminContextProvider from './context/AdminContext';
import AuthContextProvider from './context/AuthContext';
import ClientContextProvider from './context/ClientContext'
import CommentContextProvider from './context/CommentContext';
import Footer from './footer/Footer';
import AddPage from './pages/AddPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import DetailPage from './pages/DetailPage';
import EditPage from './pages/EditPage';
import MainPage from './pages/MainPage';

const MyRoutes = () => {
    return (
        <CommentContextProvider>
            <AuthContextProvider>
                <AdminContextProvider>
                    <ClientContextProvider>
                        <BrowserRouter>
                            <MyNavBar />
                            <Routes>
                                <Route path='/admin' element={<AdminPage />} />
                                <Route path="/admin/add" element={<AddPage />} />
                                <Route path="/" element={<MainPage />} />
                                <Route path="/guitar/:id" element={<DetailPage />} />
                                <Route path="/admin/edit/:id" element={<EditPage />} />
                                <Route path="/cart" element={<CartPage />} />

                            </Routes>
                            <Footer />
                        </BrowserRouter>
                    </ClientContextProvider>
                </AdminContextProvider>
            </AuthContextProvider>
        </CommentContextProvider>~
    );
};

export default MyRoutes;