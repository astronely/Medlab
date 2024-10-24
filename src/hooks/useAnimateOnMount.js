import { useState, useEffect } from 'react';

export function useAnimateOnMount(initialActive = false) {
    const [isActive, setIsActive] = useState(initialActive);

    useEffect(() => {
        setIsActive(true);
    }, []);

    return isActive;
}
