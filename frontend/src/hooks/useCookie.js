import { useState, useEffect } from 'react';

const useCookie = (cookieName) => {
    const [cookieValue, setCookieValue] = useState(null);

    useEffect(() => {
        const getCookieValue = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        console.log("Document Cookies:", document.cookie); // Log all cookies

        const value = getCookieValue(cookieName);
        console.log("Cookie Value:", value); // Log the specific cookie value
        setCookieValue(value);
    }, [cookieName]);

    return cookieValue;
};

export default useCookie;
