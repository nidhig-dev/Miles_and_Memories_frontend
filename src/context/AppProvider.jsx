import AuthContext from "./authContext/AuthContext";
import UserProvider from "./userContext/UserContext";
import { CookiesProvider } from "react-cookie";


export default function AppProvider({ children }) {
    return (
        <CookiesProvider>
            <UserProvider>
                <AuthContext>{children}</AuthContext>
            </UserProvider>
        </CookiesProvider>
    );
}
