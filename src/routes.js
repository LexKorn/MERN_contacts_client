import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {ContactsPage} from './pages/ContactsPage';
import {AuthPage} from './pages/AuthPage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path='/contacts' element={<ContactsPage />}></Route>
                <Route path="/*" element={<Navigate replace to="/contacts" />} />
            </Routes>
        );        
    } else {
        return (
            <Routes>
                <Route path='/' element={<AuthPage />}></Route>
                <Route path="/*" element={<Navigate replace to="/" />} />
            </Routes>
        );
    }
}