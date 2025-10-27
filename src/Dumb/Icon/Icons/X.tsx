import type { IconProps, LineInputs } from '../interfaces';
import Icon from '../';

const X_LINES: LineInputs = [
    [
        [8, 8],
        [16, 16],
    ],
    [
        [16, 8],
        [8, 16],
    ],
];

export default function IconX({
    lines,
    polylines,
    rotate,
    ...rest
}: IconProps) {
    return <Icon lines={X_LINES} {...rest} />;
}
