import type { IconProps } from '../interfaces';
import Icon, { Rect } from '../';

export default function IconExportSheet({
    lines,
    polylines,
    rotate,
    fillChildren,
    // = 'currentColor',
    ...rest
}: IconProps) {
    return (
        <Icon {...rest}>
            <Rect x={7} y={7} width={10} height={10} fill={fillChildren} />
        </Icon>
    );
}
