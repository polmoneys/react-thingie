import { type CSSProperties, type ReactNode } from 'react';

import { clsx, has } from '../../utils';
import Media from '../Media';
import Video from '../Media/Video';
import Player from '../Media/Video/Player';

import type { CardProps } from './interfaces';

import styles from './index.module.css';

const Card = (props: CardProps) => {
    const {
        children,
        component: Component = 'div',
        ratio,
        className,
        dangerous: style,
        ...rest
    } = props;

    return (
        <Component
            className={clsx(
                className,
                styles.card,
                has(ratio) && 'ratio',
                has(ratio) && ratio,
            )}
            {...rest}
            {...(has(style) && { style })}
        >
            {children}
        </Component>
    );
};

const Title = ({
    children,
    className,
    dangerous: style,
}: {
    children: ReactNode;
    className?: string;
    dangerous?: CSSProperties;
}) => (
    <header
        {...(className !== undefined && { className })}
        {...(has(style) && { style })}
    >
        {children}
    </header>
);

const Content = ({
    children,
    className,
    dangerous: style,
}: {
    children: ReactNode;
    className?: string;
    dangerous?: CSSProperties;
}) => (
    <div
        {...(className !== undefined && { className })}
        {...(has(style) && { style })}
    >
        {children}
    </div>
);

const Actions = ({
    children,
    className,
    dangerous: style,
}: {
    children: ReactNode;
    className?: string;
    dangerous?: CSSProperties;
}) => (
    <footer
        {...(className !== undefined && { className })}
        {...(has(style) && { style })}
    >
        {children}
    </footer>
);

const Portrait = (props: CardProps) => {
    const { ratio, ...rest } = props;
    return <Card {...rest} ratio="portrait" />;
};

const Landscape = (props: CardProps) => {
    const { ratio, ...rest } = props;
    return <Card {...rest} ratio="landscape" />;
};

export default Object.assign(Card, {
    Media,
    Video,
    Player,
    Portrait,
    Landscape,
    Actions,
    Title,
    Content,
});
