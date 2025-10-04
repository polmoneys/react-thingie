import { type ReactNode, useState } from 'react';

import { InView } from 'react-intersection-observer';

import { has } from '../../utils';

interface Props {
    children: ReactNode;
    className?: string;
    options?: {
        threshold?: number;
        rootMargin?: string;
        triggerOnce?: boolean;
    };
    onChange?: (on: boolean) => void;
    component?: string;
    ifOn?: ReactNode;
}

export default function Fence(props: Props) {
    const { children, options, onChange, className, ifOn } = props;
    const [state, setState] = useState(false);

    return (
        <InView
            {...(options !== undefined && {
                ...options,
            })}
            onChange={(
                inView,
                // entry
            ) => {
                onChange?.(inView);
                if (has(ifOn) && inView) {
                    setState(true);
                } else {
                    setState(false);
                }
            }}
            {...(className !== undefined && { className })}
        >
            {children}
            {has(ifOn) && state && ifOn}
        </InView>
    );
}
