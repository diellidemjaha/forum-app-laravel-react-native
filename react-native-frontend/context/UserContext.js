import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { deleteToken, getToken } from "../services/tokenService";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await getToken();
                
                if (token) {
                    const response = await axios.get('http://192.168.178.81:8000/api/user', {
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUser(response.data); // Set the user data after fetching
                }
            } catch (err) {
                console.log("Failed to fetch user", err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserData(); // Call the function here
    }, []); // Empty dependency array to run only on component mount
    
    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
