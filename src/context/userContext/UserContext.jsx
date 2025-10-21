import { useContext, createContext, useState } from "react";

const UserContext = createContext();
//This context gets all user info like user id and username to provide to all children
export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    
    const value = {
        user,
        setUser,        
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    return useContext(UserContext);
}
