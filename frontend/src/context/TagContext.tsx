import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';  // Assuming you have an AuthContext that provides user details

interface TagContextType {
    allTags: string[];
    tagColors: { [key: string]: string };
    addTag: (tag: string) => void;
}

const TagContext = createContext<TagContextType>({
    allTags: [],
    tagColors: {},
    addTag: () => { },
});

export const TagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [allTags, setAllTags] = useState<string[]>([]);
    const [tagColors, setTagColors] = useState<{ [key: string]: string }>({});
    const { user } = useContext(AuthContext);

    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const fetchTags = async () => {
        if (!user || !user.accessToken) {
            console.error('User is not authenticated');
            return;
        }

        const getHeaders = () => {
            return {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.accessToken}`,
                userId: user.id,
            };
        };

        try {
            console.log('Fetching tags...');
            // const response = await fetch('http://3.89.243.29:8080/jobs/tags', {
            const response = await fetch('http://localhost:8080/jobs/tags', {
                headers: getHeaders(),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched tags:', data);
            setAllTags(data);
            const colors = data.reduce((acc: { [key: string]: string }, tag: string) => {
                acc[tag] = generateRandomColor();
                return acc;
            }, {});
            setTagColors(colors);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    useEffect(() => {
        console.log('TagProvider mounted');
        fetchTags();
    }, [user]);

    const addTag = (tag: string) => {
        setAllTags((prevTags) => [...prevTags, tag]);
        setTagColors((prevColors) => ({
            ...prevColors,
            [tag]: generateRandomColor(),
        }));
    };

    return (
        <TagContext.Provider value={{ allTags, tagColors, addTag }}>
            {children}
        </TagContext.Provider>
    );
};

export const useTags = () => useContext(TagContext);
