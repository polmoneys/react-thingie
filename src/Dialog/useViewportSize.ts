import { useEffect, useState } from 'react';

/*
 Background: https://webdevetc.com/blog/matchmedia-events-for-window-resizes/
*/

export default function useViewportSize() {
    const [size, setSize] = useState(() => getViewportSize());
    useEffect(() => {
        // Use visualViewport api to track available height even on iOS virtual keyboard opening
        const onResize = () => setSize(getViewportSize());

        if (!visualViewport) {
            window.addEventListener('resize', onResize);
        } else {
            visualViewport.addEventListener('resize', onResize);
        }

        return () => {
            if (!visualViewport) {
                window.removeEventListener('resize', onResize);
            } else {
                visualViewport.removeEventListener('resize', onResize);
            }
        };
    }, []);

    return size;
}

function getViewportSize() {
    return {
        width: window?.visualViewport?.width ?? window?.innerWidth,
        height: window?.visualViewport?.height ?? window?.innerHeight,
    };
}
