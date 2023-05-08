import { createContext, useReducer } from 'react';

export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);


export const UserProvider = ({ children }) => {
    const [userContext, userDispatch] = useReducer(userReducer, initialUser);

    return (
        <UserContext.Provider value={userContext}>
            <UserDispatchContext.Provider value={userDispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}

const userReducer = (currentUser, action) => {
    switch (action.type) {
        case 'LOGIN_USER': {
            return action.payload.user;
        }
        case 'LOGOUT_USER': {
            return initialUser;
        }
        default: {
            return currentUser;
        }
    }
}

export const initialUser = {
    userId: -1,
    name: '',
    username: '',
    password: '',
    email: '',
    role: '',
    isLoggedIn: false
};