import type { FlatLine, LineInput, Point, PolylineInput } from './interfaces';

export const BASE_VIEWBOX = 24;
export const deg2rad = (d: number) => (d * Math.PI) / 180;

export function rotatePoint(p: Point, angleDeg: number, center: Point): Point {
    const a = deg2rad(angleDeg);
    const [cx, cy] = center;
    const dx = p[0] - cx;
    const dy = p[1] - cy;
    const x = dx * Math.cos(a) - dy * Math.sin(a) + cx;
    const y = dx * Math.sin(a) + dy * Math.cos(a) + cy;
    return [Number(x.toFixed(6)), Number(y.toFixed(6))];
}

export function rotatePolyline(
    poly: PolylineInput,
    angleDeg: number,
    center: Point,
): PolylineInput {
    if (!poly || angleDeg === 0) return poly;
    return poly.map((pt) => rotatePoint(pt, angleDeg, center));
}

/** Normalize line input to [[x1,y1],[x2,y2]] form */
export function normalizeLine(line: LineInput): [Point, Point] {
    if (line.length === 4) {
        const [x1, y1, x2, y2] = line as FlatLine;
        return [
            [x1, y1],
            [x2, y2],
        ] as unknown as [Point, Point];
    }
    return line as [Point, Point];
}

export function rotateShapes(
    polylines: PolylineInput[] | undefined,
    lines: LineInput[] | undefined,
    angleDeg: number,
    center: Point,
): { polylines?: PolylineInput[]; lines?: [Point, Point][] } {
    if (angleDeg === 0) {
        return {
            polylines: polylines ? polylines.map((p) => p.slice()) : undefined,
            lines: lines ? lines.map((l) => normalizeLine(l)) : undefined,
        };
    }

    const rp = polylines?.map((poly) => rotatePolyline(poly, angleDeg, center));
    const rl = lines?.map((l) => {
        const [p1, p2] = normalizeLine(l);
        return [
            rotatePoint(p1, angleDeg, center),
            rotatePoint(p2, angleDeg, center),
        ] as [Point, Point];
    });

    return { polylines: rp, lines: rl };
}

export function pointsToString(pts: Point[]) {
    return pts.map((p) => `${p[0]} ${p[1]}`).join(' ');
}
