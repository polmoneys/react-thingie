import { has } from '../../utils';

import type { IconProps, LineInput, Point } from './interfaces';
import Loading from './Loading';
import { BASE_VIEWBOX, pointsToString, rotateShapes } from './utils';

export default function Icon({
    size = 64,
    viewBoxSize = BASE_VIEWBOX,
    polylines,
    lines,
    rotate = 0,
    padding = 2,
    strokeWidth = 2,
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    stroke = 'currentColor',
    fill = 'none',
    fillPolyLines = 'none',
    circle = true,
    children,
    transform,
    ...rest
}: IconProps) {
    const cx = viewBoxSize / 2;
    const cy = viewBoxSize / 2;
    const center: Point = [cx, cy];

    const { polylines: rp, lines: rl } = rotateShapes(
        polylines,
        lines,
        rotate,
        center,
    );

    return (
        <svg
            data-icon=""
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            width={size}
            height={size}
            stroke={stroke}
            fill={fill}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin}
            {...(has(transform) && { style: { transform } })}
            {...rest}
        >
            {circle && (
                <circle
                    cx={cx}
                    cy={cy}
                    r={cx - padding}
                    vectorEffect="non-scaling-stroke"
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeLinecap={strokeLinecap}
                    strokeLinejoin={strokeLinejoin}
                    fill={fill}
                />
            )}
            {rp?.map((poly, i) => (
                <polyline
                    key={`poly-${i}`}
                    points={pointsToString(poly)}
                    fill={fillPolyLines}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeLinecap={strokeLinecap}
                    strokeLinejoin={strokeLinejoin}
                    vectorEffect="non-scaling-stroke"
                />
            ))}
            {rl?.map((seg, i) => {
                const [[x1, y1], [x2, y2]] = seg;
                return (
                    <line
                        key={`line-${i}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        strokeLinecap={strokeLinecap}
                        strokeLinejoin={strokeLinejoin}
                        vectorEffect="non-scaling-stroke"
                    />
                );
            })}
            {children}
        </svg>
    );
}

const chevron: Point[] = [
    [10, 8],
    [15, 12],
    [10, 16],
];

Icon.Chevron = ({ polylines, lines, ...rest }: IconProps) => (
    <Icon polylines={[chevron]} {...rest} />
);
Icon.ChevronDown = ({ polylines, rotate, lines, ...rest }: IconProps) => (
    <Icon polylines={[chevron]} rotate={90} {...rest} />
);

const xLines: LineInput[] = [
    [
        [8, 8],
        [16, 16],
    ],
    [
        [16, 8],
        [8, 16],
    ],
];
Icon.X = ({ lines, polylines, rotate, ...rest }: IconProps) => (
    <Icon lines={xLines} {...rest} />
);

const infoLines: LineInput[] = [
    [
        [12, 13],
        [12, 16],
    ],
    [
        [12, 8],
        [12, 9],
    ],
];
Icon.Info = ({ lines, polylines, rotate, ...rest }: IconProps) => (
    <Icon lines={infoLines} {...rest} />
);

const addLines: Point[] = [
    [6, 12],
    [18, 12],
];

Icon.Remove = ({ lines, polylines, rotate, circle, ...rest }: IconProps) => (
    <Icon
        polylines={[addLines]}
        // circle={false}
        {...rest}
    />
);

const removeLines: LineInput[] = [
    [
        [6, 12],
        [18, 12],
    ],
    [
        [12, 6],
        [12, 18],
    ],
];

Icon.Add = ({ lines, polylines, rotate, circle, ...rest }: IconProps) => (
    <Icon
        lines={removeLines}
        // circle={false}
        {...rest}
    />
);

const exportLines: Point[] = [
    [7, 7],
    [7, 17],
    [7, 7],
    [17, 7],
    [17, 7],
    [17, 17],
    [17, 17],
    [7, 17],
];

Icon.ExportSheet = ({
    lines,
    polylines,
    rotate,
    circle,
    ...rest
}: IconProps) => (
    <Icon
        polylines={[exportLines]}
        // circle={false}
        {...rest}
    />
);

const exportLines2: LineInput[] = [
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

Icon.ExportSheets = ({ lines, polylines, rotate, ...rest }: IconProps) => (
    <Icon lines={exportLines2} {...rest} />
);

Icon.Loading = Loading;
