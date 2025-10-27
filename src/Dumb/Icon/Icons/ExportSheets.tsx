import type { IconProps, LineInputs } from '../interfaces';
import Icon from '../';

const EXPORT_LINES: LineInputs = [
    [
        [7, 7],
        [7, 17],
    ],
    [
        [7, 7],
        [17, 7],
    ],
    [
        [17, 7],
        [17, 17],
    ],
    [
        [17, 17],
        [7, 17],
    ],

    [
        [8, 5],
        [8, 7],
    ],
    [
        [8, 5],
        [16, 5],
    ],
    [
        [16, 5],
        [16, 7],
    ],
    [
        [16, 7],
        [8, 7],
    ],
];

export default function IconExportSheets({
    lines,
    polylines,
    rotate,
    ...rest
}: IconProps) {
    return <Icon lines={EXPORT_LINES} {...rest} />;
}
