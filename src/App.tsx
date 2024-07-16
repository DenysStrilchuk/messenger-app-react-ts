import {useAuth} from "./hooks";
import {Chat, Login, Register} from "./components";
import {AuthProvider} from "./contexts";

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