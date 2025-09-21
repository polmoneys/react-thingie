import type { IconProps, LineInput, Point } from './interfaces';
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
    circle = true,
    children,
    strokeScale,
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

    let scaleFactor = 1;
    if (strokeScale === true) scaleFactor = viewBoxSize / BASE_VIEWBOX;
    else if (typeof strokeScale === 'number') scaleFactor = strokeScale;
    const computedStrokeWidth = Math.max(0.01, strokeWidth * scaleFactor);

    return (
        <svg
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            width={size}
            height={size}
            stroke={stroke}
            fill={fill}
            strokeWidth={computedStrokeWidth}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin}
            {...rest}
        >
            {circle && <circle cx={cx} cy={cy} r={cx - padding} />}
            {rp?.map((poly, i) => (
                <polyline
                    key={`poly-${i}`}
                    points={pointsToString(poly)}
                    fill="none"
                />
            ))}
            {rl?.map((seg, i) => {
                const [[x1, y1], [x2, y2]] = seg;
                return (
                    <line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />
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
