import { type ChangeEvent } from 'react';

import { Thingie } from '../Demos/List';
import Alert from '../Dumb/Alert';
import Button from '../Dumb/Button';
import Checkbox, { type TriState } from '../Dumb/Checkbox';
import Font from '../Dumb/Font';
import Grid from '../Dumb/Grid';
import Mua from '../Dumb/Group/Mua';
import Shape from '../Dumb/Shape';
import Slot from '../Dumb/Slot';
import { formatSelectedKeys } from '../utils';

export default function StocksList() {
    const { useSelection } = Thingie;

    const api = useSelection();
    const formatted = formatSelectedKeys(api.selectedKeys);

    const onChangeLeader = (event: ChangeEvent<HTMLInputElement>) => {
        const el = event.currentTarget;

        const value: TriState = el.indeterminate ? 'mixed' : el.checked;
        // 'mixed' | true | false
        if (!value) api.clear();
        if (value) api.items.map((item) => api.add(item));
    };
    return (
        <>
            <Alert
                style={{
                    display: 'flex',
                    gap: 'var(--gap-1)',
                    width: 'fit-content',
                    marginTop: 'var(--gap-3)',
                }}
            >
                {' '}
                <Font>
                    Selected count:{' '}
                    <Font.Bold component="span">
                        {api.selectedCount} , {formatted}
                    </Font.Bold>
                </Font>
            </Alert>

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

            {api.items?.map((item, pos) => (
                <Slot
                    key={item.id}
                    gradient={`${!api.isSelected(item) ? 'var(--accent)' : 'var(--red)'} 0, ${!api.isSelected(item) ? 'var(--accent)' : 'var(--red)'} 60px, var(--white) 60px, var(--white) calc(100% - 132px), var(--nemesis) calc(100% - 132px),var(--nemesis) 100%`}
                    start={
                        <Shape
                            sides={api.isSelected(item) ? 4 : 22}
                            size={22}
                        />
                    }
                    startWidth="60px"
                    end={
                        <Button onClick={() => api.toggle(item)}>
                            {api.isSelected(item) ? 'Remove' : 'Add'}
                        </Button>
                    }
                    endWidth="130px"
                    dangerous={{
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

            <Button
                onClick={() => console.log('export ->', api.exportSelected())}
            >
                Export
            </Button>
            <Button onClick={() => api.clear()} dangerous={{ marginLeft: 8 }}>
                Clear
            </Button>
        </>
    );
}
