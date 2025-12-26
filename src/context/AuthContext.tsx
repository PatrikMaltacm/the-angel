import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
    message?: string;
    token?: string;
    user?: {
        createdAt: {
            _nanoseconds: number;
            _seconds: number;
        }
        displayName: string;
        email: string;
        id: string;
        profileCompleted: boolean;
        uuid: string;
        updatedAt: {
            _nanoseconds: number;
            _seconds: number;
        }
    },
}

interface AuthContextData {
    user: User | null;
    signed: boolean;
    signIn: (userData: User) => void;
    signOut: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storagedUser = localStorage.getItem('@Refugio:user');

        if (storagedUser) {
            setUser(JSON.parse(storagedUser));
        }
        setLoading(false);
    }, []);

    const signIn = (userData: User) => {
        setUser(userData);
        localStorage.setItem('@Refugio:user', JSON.stringify(userData));
    };

    const signOut = () => {
        localStorage.removeItem('@Refugio:user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);