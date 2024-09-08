// CsrfContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

//コンテキストのオブジェクト作成
const CsrfContext = createContext(null);

export function CsrfProvider({ children }) {
    const [csrfToken, setCsrfToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCsrfToken() {
            if (import.meta.env.VITE_APP_SKIP_CSRF === "認証なし") {
                setCsrfToken("");
                setLoading(false);
            } else {
                try {
                    const response = await fetch(import.meta.env.VITE_APP_API_URL + '/api/csrf-token');
                    const token = await response.text();
                    setCsrfToken(token);
                } catch (error) {
                    console.error('Failed to fetch CSRF token:', error);
                    setCsrfToken(null);  // エラー時はnullをセット
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchCsrfToken();
    }, []);

    return (
        <CsrfContext.Provider value={{ csrfToken, loading }}>
            {children}
        </CsrfContext.Provider>
    );
}

export function useCsrfContext() {
    const context = useContext(CsrfContext);
    if (context === undefined) {
        throw new Error('useCsrfContext must be used within a CsrfProvider');
    }
    return context;
}