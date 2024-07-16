import { useAuth } from "./hooks";
import { Chat, Login, Register } from "./components";
import { AuthProvider } from "./contexts";

const App: React.FC = () => {
    const { currentUser } = useAuth();
    const receiver = { uid: 'some-uid', email: 'receiver@example.com' };

    return (
        <AuthProvider>
            <div>
                {currentUser ? <Chat receiver={receiver} /> : (
                    <>
                        <Login />
                        <Register />
                    </>
                )}
            </div>
        </AuthProvider>
    );
};

export { App };
