import {useRef, useCallback} from 'react';


export const useDebounce = (func, time) => {
    const timer = useRef(null);
    return useCallback((...args) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => func(...args), time);
    }, [func, time]);
}