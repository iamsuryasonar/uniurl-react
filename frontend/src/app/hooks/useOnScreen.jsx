import { useEffect, useState, useRef } from 'react';

const useOnScreen = (options) => {
    const ref = useRef();
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting);
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current); 
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return [ref, isIntersecting];
};

export default useOnScreen;