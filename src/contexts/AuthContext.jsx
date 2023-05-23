import { createContext, useState } from 'react';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    const login = (email, password) => {
        if (email === 'codecamp@mail.com' && password === '1234') {
            setIsAuth(true);
            setUser({ userId: 20, firstName: 'Job', lastName: 'Keow' });
        }
    };
    const logout = () => {
        setUser(null);
        setIsAuth(false);
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isAuth,
                setIsAuth,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
