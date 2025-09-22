import {
    cloneElement,
    type CSSProperties,
    type ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';

import { FocusScope } from '@react-aria/focus';
import ReactDOM from 'react-dom';

import { clsx, useViewportSize } from '../utils';

import styles from './index.module.css';

// const Tray = dynamic<TrayProps>(() => import('../Dialog/Tray').then((comp) => comp as never), {
//     ssr: false,
// });

interface Props {
    children: ReactNode;
    onClose: () => void;
}

export default function Tray({ children, onClose, ...rest }: Props) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            const dialog = ref.current;
            if (!dialog?.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('click', onClick, { capture: true });
        return () => {
            document.removeEventListener('click', onClick, {
                capture: true,
            });
        };
    });

    const viewport = useViewportSize();
    const [height, setHeight] = useState(viewport.height); // vs. viewportHeight
    const timeoutRef = useRef(0);

    useEffect(() => {
        clearTimeout((timeoutRef as any).current);

        // When the height is decreasing, and the keyboard is visible
        // (visual viewport smaller than layout viewport), delay setting
        // the new max height until after the animation is complete
        // so that there isn't an empty space under the tray briefly.
        if (viewport.height < height && viewport.height < window.innerHeight) {
            (timeoutRef as any).current = setTimeout(() => {
                setHeight(viewport.height);
            }, 500);
        } else {
            setHeight(viewport.height);
        }
    }, [height, viewport.height]);

    const trayHeight: Record<string, string> = {
        '--tray-min-height': `${height}px`,
    };

    return ReactDOM.createPortal(
        <div className={styles.overlay}>
            <div
                {...rest}
                ref={ref}
                className={clsx(styles.tray, styles.isOpen)}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                style={trayHeight}
            >
                <FocusScope contain restoreFocus autoFocus>
                    {children}
                </FocusScope>
            </div>
        </div>,
        document.body,
    );
}
