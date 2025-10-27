import type { IconProps } from '../interfaces';
import Icon, { Circle } from '../';

export default function IconThreeDotsVertical({
    lines,
    polylines,
    rotate,
    fillChildren = 'currentColor',
    ...rest
}: IconProps) {
    return (
        <Icon {...rest}>
            <Circle cx={12} cy={8} r={1} fill={fillChildren} />
            <Circle cx={12} cy={12} r={1} fill={fillChildren} />
            <Circle cx={12} cy={16} r={1} fill={fillChildren} />
        </Icon>
    );
}
