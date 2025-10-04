import { useState } from 'react';

import Button from '../Dumb/Button';
import Font from '../Dumb/Font';
import createPortal from '../Dumb/Portal';
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
                <br />
                <Font px="var(--gap-1)">I'm portaled into the portal </Font>
                <br />
            </Portal>
            {io && (
                <Portal>
                    <Font px="var(--gap-1)">
                        I'm a portal rendered conditionally{' '}
                    </Font>
                </Portal>
            )}
            <Portal>
                {io && (
                    <Font px="var(--gap-1)">
                        I'm conditionally rendered inside portal{' '}
                    </Font>
                )}
            </Portal>

            <Button.Group direction="vertical">
                {({ active, setActive }) => {
                    return (
                        <>
                            <Button
                                stretch
                                isActive={active === 0}
                                onClick={callAll(setPortal, () => setActive(0))}
                            >
                                0%
                            </Button>
                            <Button
                                stretch
                                isActive={active === 1}
                                onClick={callAll(setFallback, () =>
                                    setActive(1),
                                )}
                            >
                                50%
                            </Button>
                            <Button
                                stretch
                                isActive={active === 2}
                                onClick={callAll(setAll, () => setActive(2))}
                            >
                                75%
                            </Button>
                            <Button
                                stretch
                                isActive={active === 3}
                                onClick={callAll(setNone, () => setActive(3))}
                            >
                                100%
                            </Button>
                        </>
                    );
                }}
            </Button.Group>
        </>
    );
}
