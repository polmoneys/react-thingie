import type { IconProps } from '../interfaces';
import Icon, { Circle, Ellipse } from '../';

export default function IconPreview({
    lines,
    polylines,
    rotate,
    fillChildren,
    ...rest
}: IconProps) {
    return (
        <Icon {...rest}>
            <Ellipse cx={12} cy={12} rx={6} ry={4} stroke={fillChildren} />
            <Circle cx={12} cy={12} r={2} stroke={fillChildren} />
        </Icon>
    );
}
