import type { IconProps, PolylineInput } from '../interfaces';
import Icon from '../';

const REMOVE_LINES: PolylineInput = [
    [6, 12],
    [18, 12],
];

export default function IconRemove({
    lines,
    polylines,
    rotate,
    ...rest
}: IconProps) {
    return <Icon polylines={[REMOVE_LINES]} {...rest} />;
}
