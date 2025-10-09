import { useState } from 'react';

import GridTemplateColumns from '../Dumb/Grid/GridTemplateColumns';
import Group from '../Dumb/Group';
import Icon from '../Dumb/Icon';
import Shape from '../Dumb/Shape';
import ContainerSize from '../Dumb/Size';
import StrokeDashoffset from '../Dumb/StrokeDashOffset';

export default function DemoIcons() {
    const [progress, setProgress] = useState(0);
    return (
        <>
            <ContainerSize>
                {({ w }) => (
                    <Group
                        flexDirection={w < 500 ? 'column' : 'row'}
                        className="wrap"
                        dangerous={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 'var(--border-radius)',
                        }}
                    >
                        <Icon.X />
                        <Icon.Chevron />
                        <Icon.ChevronDown />
                        <Icon.Add fill="var(--info)" />

                        <Icon.Remove fillPolyLines="var(--info)" />
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
                        <Icon.X />
                        <Icon.X stroke="var(--info)" />
                        <Icon.X circle={false} />

                        <Icon.ExportSheet
                            size={48}
                            fillPolyLines="var(--info)"
                        />
                        <Icon.ExportSheets size={72} fill="var(--info)" />
                        <Icon.ExportSheets size={72} strokeWidth={1} />
                    </Group>
                )}
            </ContainerSize>
            <br />
            <ContainerSize>
                {({ w }) => (
                    <Group
                        flexDirection={w < 500 ? 'column' : 'row'}
                        className="wrap"
                        dangerous={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 'var(--border-radius)',
                        }}
                    >
                        <Shape.Triangle />
                        <Shape.Square fill="var(--positive)" />
                        <Shape sides={5} fill="var(--positive)" />
                        <Shape sides={6} fill="var(--positive)" />
                        <Shape
                            sides={7}
                            fill="var(--negative)"
                            stroke="var(--positive)"
                            strokeWidth={4}
                        />
                        <Shape
                            sides={8}
                            fill="var(--positive)"
                            stroke="var(--negative)"
                            strokeWidth={4}
                        />
                        <Shape sides={9} fill="var(--positive)" />
                        <Shape sides={10} fill="var(--positive)" />
                        <Shape sides={11} fill="var(--positive)" />
                        <Shape sides={12} fill="var(--positive)" />
                        <Shape.Circle fill="var(--info)" />
                    </Group>
                )}
            </ContainerSize>

            <GridTemplateColumns
                gridTemplateColumns={{ xs: '1fr', md: '200px 1fr' }}
                gap={{ xs: 'var(--gap-1)', md: 'var(--gap-3)' }}
            >
                <input
                    type="range"
                    value={progress}
                    onChange={(event) =>
                        setProgress(Number(event.target.value))
                    }
                />

                {/*<datalist id="values">
                    <option value="0" label="very cold!"></option>
                    <option value="25" label="cool"></option>
                    <option value="50" label="medium"></option>
                    <option value="75" label="getting warm!"></option>
                    <option value="100" label="hot!"></option>
                </datalist>*/}

                <StrokeDashoffset
                    progress={progress}
                    viewBox="0 0 73.76 45.715"
                    height="172.781"
                    width="278.7779"
                    strokeColor="var(--info)"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        d="M.8825 28.1368h7.6506l2.6171-10.6905 6.865 25.6202 3.1614-36.3492 3.9609 28.4864 1.1125-6.9395h8.7471l1.2762-7.3971 4.4477 23.966 2.3077-38.0867 1.6134 15.1554h7.5l3.3783 16.805 1.6625-13.5108h15.6946"
                        strokeWidth=".965"
                        strokeLinejoin="round"
                    />
                </StrokeDashoffset>
            </GridTemplateColumns>
            <br />
        </>
    );
}
