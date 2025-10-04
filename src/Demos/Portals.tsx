import { useState } from 'react';

import Button from '../Dumb/Button';
import createPortal from '../Dumb/Portal';
import Shape from '../Dumb/Shape';
import { callAll } from '../utils';

const PortalDemo = createPortal('DemoPortal');

export default function DemoPortal() {
    const { PortalProvider } = PortalDemo;

    return (
        <PortalProvider>
            <DemoPortalContent />
        </PortalProvider>
    );
}

function DemoPortalContent() {
    const { usePortal, Portal } = PortalDemo;

    const [io, setIo] = useState(false);

    const { setPortalTarget } = usePortal();

    const setNone = () => setPortalTarget(null);
    const setFallback = () => setPortalTarget('whatever');
    const setPortal = () => setPortalTarget('aside');

    const setAll = () => {
        setPortalTarget('aside');
        setIo(true);
    };

    return (
        <>
            <Portal>
                <Shape.Triangle size={90} />
            </Portal>
            {io && (
                <Portal>
                    <Shape.Square size={90} />
                </Portal>
            )}

            <Button.Group direction="vertical">
                {({ active, setActive }) => {
                    return (
                        <>
                            <Button
                                stretch
                                isActive={active === 0}
                                onClick={callAll(setPortal, () => setActive(0))}
                            >
                                Set portal on aside element
                            </Button>
                            <Button
                                stretch
                                isActive={active === 1}
                                onClick={callAll(setFallback, () =>
                                    setActive(1),
                                )}
                            >
                                Fallback if !portalTarget
                            </Button>
                            <Button
                                stretch
                                isActive={active === 2}
                                onClick={callAll(setAll, () => setActive(2))}
                            >
                                Set aside and append
                            </Button>
                            <Button
                                stretch
                                isActive={active === 3}
                                onClick={callAll(setNone, () => setActive(3))}
                            >
                                Clear portals
                            </Button>
                        </>
                    );
                }}
            </Button.Group>
            <br />
        </>
    );
}
