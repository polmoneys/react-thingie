export type DirectionName8 =
    | 'RIGHT'
    | 'UP_RIGHT'
    | 'UP'
    | 'UP_LEFT'
    | 'LEFT'
    | 'DOWN_LEFT'
    | 'DOWN'
    | 'DOWN_RIGHT';

export type DirectionName4 = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN';
export type DistanceHuman = 'close' | 'fair' | 'far';

export interface Point {
    x: number;
    y: number;
}

export interface MoveData {
    start: Point;
    current: Point;
    dx: number;
    dy: number;
    distance: number;
    angle: number; // 0 = right, 90 = up
    direction8: DirectionName8;
    percent: number; // 0..1
    // strengthPercent is normalized so that 0 === no strength (distance <= threshold)
    strengthPercent: number; // 0..100
}

export interface SwipeSummary {
    direction4: DirectionName4;
    distanceHuman: DistanceHuman;
}

export type UseSwipeOptions = {
    // px, default 20
    threshold?: number;
    // ignore gestures that don't match axis
    lockAxis?: 'x' | 'y' | null;
    // whitelist of 8-way directions
    allowedDirections?: Array<DirectionName8> | null;
    // call preventDefault on pointerup when swipe detected
    preventDefaultOnSwipe?: boolean;
    // ignore pointerdown that starts inside interactive elements (default true)
    ignoreInteractive?: boolean;
    // optional size used for percent calculation (diagonal). falls back to element size
    size?: number | null;
    onSwipe?: (summary: SwipeSummary, details: MoveData) => void;
};
