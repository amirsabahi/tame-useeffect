import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
const useCallBackREf = (calback) => {
    const saveOnSuccess = useRef(calback);
    useLayoutEffect(() => {
        saveOnSuccess.current = calback;
    }, [calback])

    return saveOnSuccess
}

export function useFecth(options) {
    const [data, setData] = useState(null);
    const saveOnSuccess = useCallBackREf(options.onSuccess)
    useEffect(() => {
        console.log("useFecth Rendering");
        console.log(options?.url);
        if (options?.url) {
            let isCancelled = false;
            fetch(options.url).then((resp) => resp.json()).then((json) => {
                if (!isCancelled) {
                    setData(json);
                    saveOnSuccess.current?.(json)
                }

            })
            return () => {
                isCancelled = true;
            }
        }
    }, [options.url])

    return {
        data
    }
}