/*

export const meterBackground = customGradient(
  [
    {
      color: 'navy',
      stop: '0%',
    },
    {
      color: 'navy',
      stop: '15%',
    },
    {
      color: 'red',
      stop: '15%',
    },
    {
      color: 'red',
      stop: '65%',
    },
    {
      color: 'green',
      stop: '65%',
    },
    {
      color: 'green',
      stop: '100%',
    },
  ],
  'x',
)

export const workweekBackground = repeatGradient(
  { start: 'transparent', end: 'var(--bg-idle)' },
  '20%',
  'x',
)

*/
export type Colors = Record<'start' | 'end', string>;
export type Percentage = `${string}%`;
export type Direction = 'x' | 'y';
export interface Stop {
    stop: Percentage;
    color: string;
}

export type Stops = Array<Stop>;

export const repeatGradient = (
    colors: Colors,
    size: Percentage,
    direction: Direction,
): string => `repeating-linear-gradient(
    ${direction === 'x' ? '90deg' : '0deg'},
    ${colors?.start ?? 'currentColor'},
    ${colors?.start ?? 'currentColor'} ${size},
    ${colors?.end ?? 'transparent'} ${size},
    ${colors?.end ?? 'transparent'} ${Number(size.replace('%', '')) * 2}%)`;

export const customGradient = (stops: Stops, direction: Direction): string =>
    `linear-gradient(${direction === 'x' ? '90deg' : '0deg'}, ${stops
        .reduce((acc, current) => acc + `${current.color} ${current.stop},`, '')
        .slice(0, -1)})`;
