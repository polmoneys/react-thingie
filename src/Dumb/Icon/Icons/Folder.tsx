import type { IconProps } from '../interfaces';
import Icon, { Rect } from '../';

export default function IconFolder({
    lines,
    polylines,
    rotate,
    fillChildren = 'currentColor',
    ...rest
}: IconProps) {
    return (
        <Icon {...rest}>
            <Rect
                rx={2}
                x={12}
                y={6}
                width={5}
                height={4}
                fill={fillChildren}
            />
            <Rect
                rx={2}
                x={7}
                y={7}
                width={10}
                height={10}
                fill={fillChildren}
            />
        </Icon>
    );
}
