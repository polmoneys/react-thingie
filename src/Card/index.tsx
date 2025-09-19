import { type ReactNode } from 'react';

import Media from '../Media';
import Video from '../Media/Video';
import Player from '../Media/Video/Player';
import { clsx, has } from '../utils';

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
}: {
    children: ReactNode;
    className?: string;
}) => (
    <header {...(className !== undefined && { className })}>{children}</header>
);

const Content = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => <div {...(className !== undefined && { className })}>{children}</div>;

const Actions = ({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) => (
    <footer {...(className !== undefined && { className })}>{children}</footer>
);

const Portrait = (props: CardProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ratio, ...rest } = props;
    return <Card {...rest} ratio="portrait" />;
};

const Landscape = (props: CardProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ratio, ...rest } = props;
    return <Card {...rest} ratio="landscape" />;
};

// eslint-disable-next-line react-refresh/only-export-components
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
