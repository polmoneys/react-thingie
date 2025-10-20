import { clsx, has } from '../../utils';

import type {
    CircleInput,
    EllipseInput,
    IconProps,
    LineInput,
    Point,
    RectInput,
} from './interfaces';
import Loading from './Loading';
import { BASE_VIEWBOX, pointsToString, rotateShapes } from './utils';

import styles from './index.module.css';

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
    fillChildren: fillPolyLines = 'none',
    circle = true,
    children,
    transform,
    font,
    className,
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

    const rotateGroup =
        rotate !== 0 ? `rotate(${rotate} ${cx} ${cy})` : undefined;

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
            className={clsx(styles.icon, has(font) && styles.font, className)}
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

            {has(children) && <g transform={rotateGroup}>{children}</g>}
        </svg>
    );
}

export const Rect = ({
    x,
    y,
    width,
    height,
    rx,
    stroke,
    strokeWidth,
    fill,
}: RectInput) => (
    <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={rx}
        vectorEffect="non-scaling-stroke"
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
    />
);
export const Ellipse = ({
    cx,
    cy,
    rx,
    ry,
    stroke,
    strokeWidth,
    fill,
}: EllipseInput) => (
    <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        vectorEffect="non-scaling-stroke"
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
    />
);
export const Circle = ({
    cx,
    cy,
    r,
    stroke,
    strokeWidth,
    fill,
}: CircleInput) => (
    <circle
        cx={cx}
        cy={cy}
        r={r}
        vectorEffect="non-scaling-stroke"
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
    />
);

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

Icon.Remove = ({ lines, polylines, rotate, ...rest }: IconProps) => (
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

Icon.Add = ({ lines, polylines, rotate, ...rest }: IconProps) => (
    <Icon
        lines={removeLines}
        // circle={false}
        {...rest}
    />
);

Icon.ExportSheet = ({
    lines,
    polylines,
    rotate,
    fillChildren,
    ...rest
}: IconProps) => (
    <Icon
        // circle={false}
        {...rest}
    >
        <Rect x={7} y={7} width={10} height={10} fill={fillChildren} />
    </Icon>
);

Icon.Preview = ({
    lines,
    polylines,
    rotate,
    fillChildren,
    ...rest
}: IconProps) => (
    <Icon {...rest}>
        <Ellipse cx={12} cy={12} rx={6} ry={4} stroke={fillChildren} />
        <Circle cx={12} cy={12} r={2} stroke={fillChildren} />
    </Icon>
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

Icon.ThreeDots = ({
    lines,
    polylines,
    rotate,
    fillChildren = 'currentColor',
    ...rest
}: IconProps) => (
    <Icon {...rest}>
        <Circle cx={8} cy={12} r={1} fill={fillChildren} />
        <Circle cx={12} cy={12} r={1} fill={fillChildren} />
        <Circle cx={16} cy={12} r={1} fill={fillChildren} />
    </Icon>
);

Icon.ThreeDotsVertical = ({
    lines,
    polylines,
    rotate,
    fillChildren = 'currentColor',
    ...rest
}: IconProps) => (
    <Icon {...rest}>
        <Circle cx={12} cy={8} r={1} fill={fillChildren} />
        <Circle cx={12} cy={12} r={1} fill={fillChildren} />
        <Circle cx={12} cy={16} r={1} fill={fillChildren} />
    </Icon>
);

Icon.Loading = Loading;
Icon.LoadingBar = Loading;
