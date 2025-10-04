import { clsx, has } from '../../utils';

import type { SlotProps } from './interfaces';

import styles from './index.module.css';

export default function Slot({
    start,
    end,
    component: Component = 'div',
    // No need to wrap children with a div,
    // component does it to ensure line-clamp & ellipsis work
    children,
    dangerous,
    startWidth,
    endWidth,
    gradient,
}: SlotProps) {
    const sizes = {
        start: has(startWidth),
        end: has(endWidth),
        both: has(startWidth) && has(endWidth),
    };

    return (
        <Component
            className={clsx(
                styles.slot,
                has(start) && styles.hasStart,
                has(end) && styles.hasEnd,
            )}
            style={{
                ...dangerous,
                ...(has(gradient) && {
                    backgroundImage: `linear-gradient(90deg,${gradient})`,
                }),
                ...(sizes.start && {
                    '--start': startWidth,
                }),
                ...(sizes.end && {
                    '--end': endWidth,
                }),
                ...(sizes.both && {
                    '--start': startWidth,
                    '--end': endWidth,
                }),
            }}
        >
            {has(start) && start}
            <div className={styles.main}> {children}</div>
            {has(end) && end}
        </Component>
    );
}
