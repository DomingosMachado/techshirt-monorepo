import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isTwoFactorActive, setIsTwoFactorActive] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const session2FAStatus = sessionStorage.getItem('isTwoFactorActiveForSession');
        
        if (session2FAStatus === 'true') {
            setIsTwoFactorActive(true);
        }

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                
                if (decodedToken.exp * 1000 > Date.now()) {
                    const storedPermissions = localStorage.getItem('permissions');
                    let permissions = [];
                    
                    try {
                        permissions = storedPermissions ? JSON.parse(storedPermissions) : [];
                    } catch (error) {
                        console.error("Erro ao parsear permissões do localStorage:", error);
                        permissions = [];
                    }
                    
                    if (!Array.isArray(permissions)) {
                        permissions = [];
                    }
                    
                    setUser({
                        id: decodedToken.id,
                        email: decodedToken.sub, 
                        permissions: permissions
                    });
                } else {
                    logout();
                }
            } catch (error) {
                console.error("Erro ao decodificar o token na inicialização:", error);
                logout();
            }
        }
    }, []);

    const login = (token, twoFactorStatus) => {
        try {
            const decodedToken = jwtDecode(token);
            
            let permissions = [];
            
            if (decodedToken.permissions) {
                permissions = Array.isArray(decodedToken.permissions) 
                    ? decodedToken.permissions 
                    : [decodedToken.permissions];
            } else if (decodedToken.authorities) {
                permissions = Array.isArray(decodedToken.authorities) 
                    ? decodedToken.authorities 
                    : [decodedToken.authorities];
            } else if (decodedToken.roles) {
                permissions = Array.isArray(decodedToken.roles) 
                    ? decodedToken.roles 
                    : [decodedToken.roles];
            }
            
            const normalizedPermissions = permissions.map(permission => {
                if (typeof permission === 'string') {
                    return { name: permission, authority: permission };
                } else if (typeof permission === 'object') {
                    return {
                        name: permission.name || permission.authority || permission.role,
                        authority: permission.authority || permission.name || permission.role,
                        ...permission
                    };
                }
                return permission;
            });

            localStorage.setItem('token', token);
            localStorage.setItem('permissions', JSON.stringify(normalizedPermissions));
            
            setUser({
                id: decodedToken.id,
                email: decodedToken.sub, 
                permissions: normalizedPermissions
            });

            setIsTwoFactorActive(twoFactorStatus);
            sessionStorage.setItem('isTwoFactorActiveForSession', twoFactorStatus);
            
        } catch (error) {
            console.error("Erro ao processar o token durante o login:", error);
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        sessionStorage.removeItem('isTwoFactorActiveForSession');
        setUser(null);
        setIsTwoFactorActive(false);
        window.location.href = '/'; 
    };

    const updateTwoFactorStatus = (isActive) => {
        setIsTwoFactorActive(isActive);
        sessionStorage.setItem('isTwoFactorActiveForSession', isActive);
    };

    const authValue = {
        user,
        isAuthenticated: !!user,
        isTwoFactorActive,
        login,
        logout,
        updateTwoFactorStatus
    };

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};