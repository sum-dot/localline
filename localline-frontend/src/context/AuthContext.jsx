import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true); // avoids a flash of "Login" before we know
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:4000/auth/me", {
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) setIsLoggedIn(true);
            })
            .finally(() => setCheckingAuth(false));
    }, []);

    const login = async (email, password) => {
        const response = await fetch("http://localhost:4000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }

        setIsLoggedIn(true);
        navigate("/");
        return data;
    };

    const logout = async () => {
        await fetch("http://localhost:4000/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, checkingAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}