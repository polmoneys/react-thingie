import {
    Fragment,
    isValidElement,
    type ReactElement,
    type ReactNode,
    useMemo,
} from 'react';

import { clsx } from '../../utils';
import Font from '../Font';

import type { SplitMatchProps } from './interfaces';
import {
    findDividersIndexOf,
    findMatchesIndexOf,
    isIndexInMatches,
} from './utils';

import styles from './index.module.css';

// credits to https://github.com/tomsouthall/split-match

export default function SplitMatch({
    children,
    searchText = '',
    separator = ',',
    caseSensitive = false,
    global = true,
    includeSeparator = true,
}: SplitMatchProps) {
    if (typeof children !== 'string')
        console.warn('Provide a string as children');
    const text = typeof children === 'string' ? children : '';

    const matches = useMemo(
        () => findMatchesIndexOf(text, searchText, global, caseSensitive),
        [text, searchText, global, caseSensitive],
    );

    const dividers = useMemo(
        () => findDividersIndexOf(text, separator),
        [text, separator],
    );

    if (!text) return null;

    let separatorRemoved = false;

    const parts = dividers.map((dividerIndex, i) => {
        const prevIndex = dividers[i - 1] || 0;
        const segment = text.slice(prevIndex, dividerIndex);

        // Does this split contain any match?
        const isSplitMatch = matches.some(
            (m) => m[0] < dividerIndex && m[1] > prevIndex,
        );

        // Build nodes inside the split with <strong> for matched ranges
        const nodes: Array<ReactNode> = [];
        let buf = '';
        let bufIsMatch: boolean | undefined = undefined;

        for (let j = 0; j < segment.length; j++) {
            const globalIndex = prevIndex + j;
            const ch = segment[j];
            const chIsMatch = isIndexInMatches(globalIndex, matches);

            if (bufIsMatch === undefined) {
                bufIsMatch = chIsMatch;
                buf = ch;
                continue;
            }

            if (chIsMatch === bufIsMatch) {
                buf += ch;
                continue;
            }

            const key = `part-${i}-${nodes.length}`;
            if (bufIsMatch) nodes.push(<strong key={key}>{buf}</strong>);
            else nodes.push(<Fragment key={key}>{buf}</Fragment>);

            buf = ch;
            bufIsMatch = chIsMatch;
        }

        if (buf.length) {
            const key = `part-${i}-${nodes.length}`;
            if (bufIsMatch) nodes.push(<strong key={key}>{buf}</strong>);
            else nodes.push(<Fragment key={key}>{buf}</Fragment>);
        }

        // optionally trim separator at end (handle strings and element children safely)
        if (
            !includeSeparator &&
            separator &&
            nodes.length &&
            !separatorRemoved
        ) {
            const lastIdx = nodes.length - 1;
            const last = nodes[lastIdx];

            if (typeof last === 'string') {
                if (last.endsWith(separator)) {
                    nodes[lastIdx] = last.slice(0, -separator.length);
                    separatorRemoved = true;
                }
            } else if (isValidElement(last)) {
                // safe cast to access children
                const el = last as ReactElement<{
                    children?: ReactNode;
                }>;
                if (typeof el.props.children === 'string') {
                    const t = el.props.children as string;
                    if (t.endsWith(separator)) {
                        nodes[lastIdx] = (
                            <Fragment key={`trim-${i}-${lastIdx}`}>
                                {t.slice(0, -separator.length)}
                            </Fragment>
                        );
                        separatorRemoved = true;
                    }
                }
            }
        }

        return (
            <Font
                key={`split-${i}`}
                className={clsx(
                    styles.split,
                    `split-${i}`,
                    isSplitMatch && styles.match,
                )}
                data-index={i}
            >
                {nodes}
            </Font>
        );
    });

    return <div className={styles.splits}>{parts}</div>;
}
