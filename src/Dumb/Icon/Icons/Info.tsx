import type { IconProps, LineInputs } from '../interfaces';
import Icon from '../';

const INFO_LINES: LineInputs = [
    [
        [12, 13],
        [12, 16],
    ],
    [
        [12, 8],
        [12, 9],
    ],
];

export default function IconInfo({
    lines,
    polylines,
    rotate,
    ...rest
}: IconProps) {
    return <Icon lines={INFO_LINES} {...rest} />;
}
