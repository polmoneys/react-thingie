import Group from '../Dumb/Group';
import Icon from '../Dumb/Icon';
import ContainerSize from '../Dumb/Size';

export default function DemoIcons() {
    return (
        <ContainerSize>
            {({ w }) => (
                <Group
                    flexDirection={w < 500 ? 'column' : 'row'}
                    className="wrap"
                    dangerous={{
                        backgroundColor: 'var(--white)',
                        border: 'var(--border)',
                        padding: 'var(--gap-1)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 'var(--border-radius)',
                    }}
                >
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
                </Group>
            )}
        </ContainerSize>
    );
}
