import type {
    DirectionName,
    DirectionNames,
    MoveData,
    MoveSummary,
} from './interfaces';

export function angleToDirection(angle: number): DirectionName {
    const directions: DirectionNames = [
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

export function computeSummaryFromData(data: MoveData): MoveSummary {
    const roundedAngle = Math.round(data.angle);
    // strength: split percent (0..1) into 5 tiers, mapping to 1..5
    // ensure a minimum of 1 so callers always receive 1-5
    const strength = Math.max(1, Math.ceil(data.percent * 5)) as
        | 1
        | 2
        | 3
        | 4
        | 5;
    return {
        direction: data.direction,
        angle: roundedAngle,
        strength,
    };
}
