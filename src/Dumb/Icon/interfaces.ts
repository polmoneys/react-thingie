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
    fillPolyLines?: string;
    circle?: boolean;
    transform?: string;
}
