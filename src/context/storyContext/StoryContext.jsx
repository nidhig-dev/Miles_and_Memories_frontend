import { useContext, createContext, useState } from "react";

const StoryContext = createContext();
//This contexts gets all the info of a user story and provides it to all children
export default function StoryProvider({ children }) {
    const [storyInfo, setStoryInfo] = useState(null);
    const value = {
        storyInfo,
        setStoryInfo,
    };

    return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
}

export function useStory() {
    return useContext(StoryContext);
}
