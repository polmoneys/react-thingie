import { type ChangeEvent } from 'react';

import Button from '../Button';
import Checkbox, { type TriState } from '../Checkbox';
import Font from '../Font';
import Grid from '../Grid';
import Mua from '../Mua';
import Shape from '../Shape';
import { formatSelectedKeys } from '../utils';

import { Thingie } from './Demo';
import Slot from './Slot';

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
            <div style={{ margin: 'var(--gap-3) 0' }}>
                <Font>
                    Selected count:{' '}
                    <Font.Bold component="span">
                        {api.selectedCount} , {formatted}
                    </Font.Bold>
                </Font>
            </div>

            <Mua
                component="label"
                dangerous={{
                    width: 'fit-content',
                    margin: 'var(--gap-3) 0',
                }}
            >
                <Checkbox
                    id="master-checkbox"
                    checked={api.selectedCount > 0 ? 'mixed' : false}
                    onChange={onChangeLeader}
                />
                Has selections
            </Mua>
            <Grid gap="var(--gap-1)" width="10em" m="var(--gap-3) 0">
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
            {api.items?.map((item, pos) => (
                <Slot
                    key={item.id}
                    gradient="var(--accent) 0, var(--accent) 60px, var(--white) 60px, var(--white) calc(100% - 132px), var(--nemesis) calc(100% - 132px),var(--nemesis) 100%"
                    start={<Shape.Circle size={35} />}
                    startWidth="60px"
                    end={
                        <Button onClick={() => api.toggle(item)}>
                            {api.isSelected(item) ? 'Remove' : 'Add'}
                        </Button>
                    }
                    endWidth="130px"
                    dangerous={{
                        backgroundColor: api.isSelected(item)
                            ? 'red'
                            : 'transparent',
                        marginBottom:
                            (api.items ?? []).length - 1 === pos
                                ? 0
                                : 'var(--gap-1)',
                    }}
                >
                    <Font
                        px="var(--gap-3)"
                        clamp={1}
                        onClick={() => api.toggle(item)}
                    >
                        {item.id} {item.code}
                    </Font>
                </Slot>
            ))}

            <div style={{ marginTop: 8 }}>
                <Button
                    onClick={() =>
                        console.log('export ->', api.exportSelected())
                    }
                >
                    Export
                </Button>
                <Button onClick={() => api.clear()} style={{ marginLeft: 8 }}>
                    Clear
                </Button>
            </div>
        </>
    );
}
