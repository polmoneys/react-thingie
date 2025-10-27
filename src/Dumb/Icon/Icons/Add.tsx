import type { IconProps, LineInputs } from '../interfaces';
import Icon from '../';

const LINES_ADD: LineInputs = [
    [
        [6, 12],
        [18, 12],
    ],
    [
        [12, 6],
        [12, 18],
    ],
];

export default function IconAdd({
    lines,
    polylines,
    rotate,
    ...rest
}: IconProps) {
    return (
        <Icon
            lines={LINES_ADD}
            // circle={false}
            {...rest}
        />
    );
}
