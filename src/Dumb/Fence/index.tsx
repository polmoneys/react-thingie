import { useState } from 'react';

import { InView } from 'react-intersection-observer';

import { has } from '../../utils';

import type { FenceProps } from './interfaces';

export default function Fence(props: FenceProps) {
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
