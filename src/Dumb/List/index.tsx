import { type ChangeEvent } from 'react';

import { Thingie } from '../../Demos/List';
import { formatSelectedKeys } from '../../utilities/intl';
import Alert from '../Alert';
import Button from '../Button';
import Checkbox, { type TriState } from '../Checkbox';
import Font from '../Font';
import Grid from '../Grid';
import Mua from '../Group/Mua';
import Shape from '../Shape';
import Slot from '../Slot';

export default function StocksList() {
    const { useSelection } = Thingie;

    const api = useSelection();
    const formatted = formatSelectedKeys(api.selectedKeys);

    console.log({ formatted });
    const onChangeLeader = (event: ChangeEvent<HTMLInputElement>) => {
        const el = event.currentTarget;

        const value: TriState = el.indeterminate ? 'mixed' : el.checked;
        // 'mixed' | true | false
        if (!value) api.clear();
        if (value) api.items.map((item) => api.add(item));
    };
    return (
        <>
            <br />

            <Mua
                component="label"
                dangerous={{
                    width: 'fit-content',
                }}
            >
                <Checkbox
                    id="master-checkbox"
                    checked={api.selectedCount > 0 ? 'mixed' : false}
                    onChange={onChangeLeader}
                />
                Has selections
            </Mua>
            <br />

            <Grid gap="var(--gap-1)" width="10em">
                {api.items.map((s) => (
                    <Mua
                        component="label"
                        dangerous={{ width: 'fit-content' }}
                        key={s.id}
                    >
                        <Checkbox
                            id={`${s.id}-checkbox`}
                            checked={api.isSelected(s)}
                            onChange={() => api.toggle(s)}
                        />
                        {s.code}
                    </Mua>
                ))}
            </Grid>
            <br />

            <Alert
                style={{
                    display: 'flex',
                    gap: 'var(--gap-1)',
                    width: 'fit-content',
                }}
            >
                {' '}
                <Font>
                    Selected count:{' '}
                    <Font.Bold component="span">
                        {api.selectedCount} {api.selectedCount > 0 ? ',' : ''}{' '}
                        {formatted}
                    </Font.Bold>
                </Font>
            </Alert>

            <br />

            {api.items?.map((item, pos) => (
                <Slot
                    key={item.id}
                    gradient={`${!api.isSelected(item) ? 'var(--transparent)' : 'var(--positive)'} 0, ${!api.isSelected(item) ? 'var(--transparent)' : 'var(--positive)'} 60px, var(--neutral) 60px, var(--neutral) calc(100% - 132px), var(--white) calc(100% - 132px),var(--white) 100%`}
                    start={
                        <Shape
                            sides={api.isSelected(item) ? 4 : 22}
                            size={22}
                        />
                    }
                    startWidth="60px"
                    end={
                        <Button.Text onClick={() => api.toggle(item)}>
                            {api.isSelected(item) ? 'Remove' : 'Add'}
                        </Button.Text>
                    }
                    endWidth="130px"
                    dangerous={{
                        border: 'var(--border)',
                        marginBottom:
                            (api.items ?? []).length - 1 === pos
                                ? 0
                                : 'var(--gap-1)',
                    }}
                >
                    <Font.Bold
                        px="var(--gap-3)"
                        clamp={1}
                        onClick={() => api.toggle(item)}
                    >
                        {item.code}
                    </Font.Bold>
                </Slot>
            ))}

            <br />

            <Button.Positive
                onClick={() => console.log('export ->', api.exportSelected())}
            >
                Export
            </Button.Positive>
            <Button.Negative
                onClick={() => api.clear()}
                dangerous={{ marginLeft: 8 }}
            >
                Clear
            </Button.Negative>
            <br />
            <br />
        </>
    );
}
