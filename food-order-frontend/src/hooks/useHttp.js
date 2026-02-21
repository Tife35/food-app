import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);

    const resData = await response.json();

    if(!response.ok) {
        throw new Error(
            resData.message || 'Something went wrong, failed to send request.'
        );
    }

    return resData;
}

export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState();

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(async function sendRequest(data) {
        setIsSending(true);
        setError(null);

        try {
            const resData = await sendHttpRequest(url, {...config, body: data});
            setData(resData);
        } catch (error) {

            setError(error.message || 'Something went wrong!');
        }
        setIsSending(false);

    }, [url, config]);

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            setIsLoading(true);
            sendRequest();
            setIsLoading(false);
        }
        
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        isSending,
        error,
        sendRequest,
        clearData
    }
}