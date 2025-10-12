import { type ReactNode } from 'react';

export type DirectionName =
    | 'RIGHT'
    | 'UP_RIGHT'
    | 'UP'
    | 'UP_LEFT'
    | 'LEFT'
    | 'DOWN_LEFT'
    | 'DOWN'
    | 'DOWN_RIGHT';

export type DirectionNames = Array<DirectionName>;

export interface Point {
    // px relative to top-left of the membrane
    x: number;
    y: number;
}

export interface MoveData {
    start: Point;
    current: Point;
    dx: number;
    dy: number;
    // px
    distance: number;
    // degrees (0 = right, 90 = up, 180 = left, 270 = down)
    angle: number;
    // one of 8-way names
    direction: DirectionName;
    // distance / diagonal-of-square (0..1)
    percent: number;
}

export interface MoveSummary {
    // 8-way name
    direction: DirectionName;
    // rounded integer degrees (no decimals)
    angle: number;
    // discrete strength 1..5 (1 weakest, 5 strongest)
    strength: 1 | 2 | 3 | 4 | 5;
}

export interface MembraneProps {
    label: string;
    width?: number;
    height?: number;
    threshold?: number;
    showOverlay?: boolean;
    fadeOutMs?: number;
    className?: string;
    onStart?: (p: Point) => void;
    onMove?: (summary: MoveSummary) => void;
    // called when pointer up/cancel
    onEnd?: (payload: { summary: MoveSummary; details: MoveData }) => void;
    children?: ReactNode;
}
