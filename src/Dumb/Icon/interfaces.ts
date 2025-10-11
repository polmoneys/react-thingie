export type Point = [number, number];
export type FlatLine = [number, number, number, number];
export type LineInput = [Point, Point] | FlatLine;
export type PolylineInput = Point[];

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
    size?: number;
    padding?: number;
    viewBoxSize?: number;
    polylines?: PolylineInput[];
    lines?: LineInput[];
    rotate?: number;
    strokeWidth?: number;
    strokeLinecap?: React.SVGProps<SVGLineElement>['strokeLinecap'];
    strokeLinejoin?: React.SVGProps<SVGLineElement>['strokeLinejoin'];
    stroke?: string;
    fill?: string;
    fillChildren?: string;
    circle?: boolean;
    transform?: string;
    font?: boolean;
}

export type RectInput = {
    x: number;
    y: number;
    width: number;
    height: number;
    // rounded corners
    rx?: number;
    ry?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
};

export type CircleInput = {
    cx: number;
    cy: number;
    r: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
};

export type EllipseInput = {
    cx: number;
    cy: number;
    rx: number;
    ry: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
};
