import { Fragment, type ReactNode,useState } from 'react';

import { clsx, has } from '../utils';

import type { MediaProps } from './interfaces';
import { fallback } from './utils';

import styles from './index.module.css';

function Media(props: MediaProps) {
    const {
        height,
        sources,
        src,
        alt = '',
        eager = false,
        objectPosition,
        ratio = 'landscape',
        // priority = 'low',
    } = props;

    const [hasError, setError] = useState(false);
    const onErrorImage = (): void => {
        setError(true);
    };

    let sourcesTags: ReactNode = <Fragment />;

    if (has(sources)) {
        sourcesTags = Object.keys(sources!).map((key) => {
            const hasSource = has(sources?.[key]);
            const type = `image/${key}`;
            const srcSet = sources?.[key]?.toString();
            return hasSource ? (
                <source key={key} type={type} srcSet={srcSet} />
            ) : (
                <Fragment />
            );
        });
    }

    return (
        <picture
            className={clsx(styles.media, styles[ratio])}
            {...(has(height) && { style: { height } })}
            onError={onErrorImage}
        >
            {hasError && (
                <img
                    src={fallback('600px', height ?? '200px', 'currentColor')}
                    alt="Loading error"
                />
            )}

            {!hasError && (
                <Fragment>
                    {sourcesTags}
                    <img
                        src={src}
                        alt={alt}
                        loading={eager ? 'eager' : 'lazy'}
                        height={height}
                        {...(has(objectPosition) && {
                            style: { objectPosition },
                        })}
                        // fetchpriority={priority}
                    />
                </Fragment>
            )}
        </picture>
    );
}

export default Media;
