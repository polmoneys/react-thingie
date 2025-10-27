import type { IconProps, PolylineInput } from '../interfaces';
import Icon from '../';

export const CHEVRON: PolylineInput = [
    [10, 8],
    [15, 12],
    [10, 16],
];

export default function IconChevron({ polylines, lines, ...rest }: IconProps) {
    return <Icon polylines={[CHEVRON]} {...rest} />;
}

export function IconChevronDown({
    polylines,
    rotate,
    lines,
    ...rest
}: IconProps) {
    return <Icon polylines={[CHEVRON]} rotate={90} {...rest} />;
}
export function IconChevronUp({
    polylines,
    rotate,
    lines,
    ...rest
}: IconProps) {
    return <Icon polylines={[CHEVRON]} rotate={270} {...rest} />;
}
