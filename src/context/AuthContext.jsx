import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const userData = await account.get();
            setUser(userData);
        } catch (error) {
            console.log("No user logged in");
        }
    };

    const loginWithGoogle = async () => {
        try {
            await account.createOAuth2Session("google", "http://localhost:5173");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = async () => {
        await account.deleteSession("current");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
