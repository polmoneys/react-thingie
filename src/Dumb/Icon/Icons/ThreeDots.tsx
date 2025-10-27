import type { IconProps } from '../interfaces';
import Icon, { Circle } from '../';

export default function IconThreeDots({
    lines,
    polylines,
    rotate,
    fillChildren = 'currentColor',
    ...rest
}: IconProps) {
    return (
        <Icon {...rest}>
            <Circle cx={8} cy={12} r={1} fill={fillChildren} />
            <Circle cx={12} cy={12} r={1} fill={fillChildren} />
            <Circle cx={16} cy={12} r={1} fill={fillChildren} />
        </Icon>
    );
}
