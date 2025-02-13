import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { loginWithGoogle } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <button onClick={loginWithGoogle} className="bg-blue-500 text-white px-4 py-2 rounded">
                Login with Google
            </button>
        </div>
    );
};

export default Login;