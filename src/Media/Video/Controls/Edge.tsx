import { clsx } from '../../../utils';

import styles from '../index.module.css';

interface Props {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
    position: 'start' | 'end';
}

export default function Edge(props: Props) {
    const { position, onMouseDown, onMouseUp, onTouchEnd, onTouchStart } =
        props;

    return (
        <div
            aria-hidden="true"
            className={clsx(styles[`edge${position}`])}
            style={{
                ...(position === 'start' && {
                    left: 0,
                }),
                ...(position === 'end' && {
                    right: 0,
                }),
            }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        ></div>
    );
}
