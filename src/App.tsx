import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./contexts/AuthContext";
import { Chat } from "./components/ChatContainer/Chat";
import { Register } from "./components/AuthContainer/Register";
import { Login } from "./components/AuthContainer/Login";

const App: React.FC = () => {
    const {currentUser} = useAuth();

    return (
        <AuthProvider>
            <div>
                {currentUser ? <Chat/> : (
                    <>
                        <Login/>
                        <Register/>
                    </>
                )}
            </div>
        </AuthProvider>
    );
};

export { App };