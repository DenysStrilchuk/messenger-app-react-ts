import {useAuth} from "./hooks/useAuth";
import {AuthProvider} from "./contexts/AuthContext";
import {Chat} from "./components/Chat/Chat";
import {Register} from "./components/Auth/Register";
import {Login} from "./components/Auth/Login";

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

export {App};