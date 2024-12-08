import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Adjust the path as needed

const useFetch = (url, options = {}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { user } = useContext(AuthContext);
    const token = user?.token;

    const fetchData = async (bodyData) => {
        setLoading(true);
        setError(null);
        try {
            const config = {
                ...options,
                body: bodyData ? JSON.stringify(bodyData) : undefined,  // Only include body if data is provided
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    ...(options.headers || {})  // Allow for custom headers
                }
            };

            // Don't include body for GET requests
            if (options.method === 'GET') {
                delete config.body;
            }

            const response = await fetch(url, config);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Failed to fetch data');
            }
            const responseData = await response.json();
            setData(responseData); // Store the response data in state
            return responseData;
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, loading, error, data };
};

export default useFetch;
