import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const ADMIN_MOBILE = "9999999999"; // Same as backend

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser && token) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
        }
        setLoading(false);
    }, [token]);

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('token', userToken);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const isAdmin = user?.mobileNumber === ADMIN_MOBILE;

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, isAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
