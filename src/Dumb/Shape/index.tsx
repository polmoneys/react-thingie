import { type ComponentProps, memo, useMemo } from 'react';

import { has, polygon } from './utils';

interface Props extends ComponentProps<'div'> {
    sides?: number;
    size?: number;
    fill?: string;
    transforms?: string;
    viewbox?: string;
    stroke?: string;
    strokeWidth?: number;
}

const Shape = (props: Props) => {
    const {
        sides = 3,
        size = 69,
        fill = 'currentColor',
        transforms,
        className,
        viewbox,
        strokeWidth = 0,
        stroke,
    } = props;

    const polyPath = useMemo(() => {
        const clampedSides = sides < 3 ? 3 : sides > 30 ? 30 : sides;
        const center = size / 2;
        return polygon(center, center, clampedSides, size / 2);
    }, [sides, size]);

    const viewBox = viewbox ?? `0 0 ${size} ${size}`;
    return (
        <svg
            aria-hidden="true"
            viewBox={viewBox}
            width={size}
            height={size}
            fill={fill}
            focusable="false"
            {...(has(className) && { className })}
            {...(has(transforms) && {
                style: { transform: transforms },
            })}
        >
            <path
                d={polyPath}
                {...(has(stroke) && { stroke })}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

Shape.Triangle = (props: Props) => <Shape {...props} sides={3} />;
Shape.Square = (props: Props) => <Shape {...props} sides={4} />;
Shape.Circle = (props: Props) => <Shape {...props} sides={25} />;

const avoidRerenderIf = (prevProps: Props, nextProps: Props): boolean => {
    return prevProps.sides === nextProps.sides;
};

Shape.Freeze = memo((props: Props) => <Shape {...props} />, avoidRerenderIf);

export default Shape;
