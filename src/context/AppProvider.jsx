import AuthContext from "./authContext/AuthContext";
import UserProvider from "./userContext/UserContext";
import StoryProvider from "./storyContext/StoryContext";
import { CookiesProvider } from "react-cookie";


export default function AppProvider({ children }) {
    return (
        <CookiesProvider>
            <UserProvider>
                <StoryProvider>
                    <AuthContext>{children}</AuthContext>
                </StoryProvider>
            </UserProvider>
        </CookiesProvider>
    );
}
