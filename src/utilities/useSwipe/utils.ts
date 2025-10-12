import type {
    DirectionName4,
    DirectionName8,
    DistanceHuman,
    MoveData,
    Point,
} from './interfaces';

export const INTERACTIVE_SELECTOR = [
    'button',
    'a[href]',
    'input',
    'textarea',
    'select',
    '[role="button"]',
].join(',');

export function angleToDirection8(angle: number): DirectionName8 {
    const directions: DirectionName8[] = [
        'RIGHT',
        'UP_RIGHT',
        'UP',
        'UP_LEFT',
        'LEFT',
        'DOWN_LEFT',
        'DOWN',
        'DOWN_RIGHT',
    ];
    const sector = Math.round(angle / 45) % 8;
    return directions[sector];
}

export function computeMoveData(
    start: Point,
    current: Point,
    sizePx: number,
    threshold: number,
): MoveData {
    const dx = current.x - start.x;
    const dy = current.y - start.y;
    const distance = Math.hypot(dx, dy);
    const angleRad = Math.atan2(-dy, dx);
    const angle = (angleRad * (180 / Math.PI) + 360) % 360;
    const diagonal = Math.hypot(sizePx, sizePx);
    const percent = Math.min(1, distance / diagonal);

    // strengthPercent should be 0 when distance <= threshold
    const effectiveRange = Math.max(1, diagonal - threshold);
    const clamped = Math.max(0, distance - threshold);
    const strengthPercent = Math.round((clamped / effectiveRange) * 100);

    const direction8 = angleToDirection8(angle);
    return {
        start,
        current,
        dx,
        dy,
        distance,
        angle,
        direction8,
        percent,
        strengthPercent,
    };
}

export function direction8To4ByDelta(dx: number, dy: number): DirectionName4 {
    if (Math.abs(dx) >= Math.abs(dy)) {
        return dx >= 0 ? 'RIGHT' : 'LEFT';
    }
    return dy <= 0 ? 'UP' : 'DOWN';
}

export function mapPercentToDistanceHuman(percent: number): DistanceHuman {
    // percent is 0..1 relative to diagonal
    if (percent < 0.13) return 'close';
    if (percent < 0.36) return 'fair';
    return 'far';
}
