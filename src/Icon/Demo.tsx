import Icon from '.';

export default function DemoIcons() {
    return (
        <div className="row wrap">
            <Icon.X />
            <Icon.Chevron />
            <Icon.ChevronDown />
            <Icon
                lines={[
                    [
                        [6, 12],
                        [18, 12],
                    ],
                    [
                        [12, 6],
                        [12, 18],
                    ],
                ]}
            />
            <Icon
                lines={[
                    [
                        [6, 12],
                        [18, 12],
                    ],
                ]}
            />
            <Icon
                rotate={90}
                lines={[
                    [
                        [6, 12],
                        [18, 12],
                    ],
                ]}
            />
            <Icon
                rotate={45}
                lines={[
                    [
                        [6, 12],
                        [18, 12],
                    ],
                ]}
            />
            <Icon
                rotate={135}
                lines={[
                    [
                        [6, 12],
                        [18, 12],
                    ],
                ]}
            />
            <Icon.X fill="var(--accent)" />
            <Icon.X stroke="var(--accent)" />
            <Icon.X circle={false} />

            <Icon.X size={48} />
            <Icon.X size={72} />
            <Icon.X size={72} strokeScale={1.4} />
        </div>
    );
}
