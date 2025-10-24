import { DEMOS_V2 } from './Demos/mock';
import useDemos from './Demos/useURLDemos';
import Alert from './Dumb/Alert';
import Button from './Dumb/Button';
import Font from './Dumb/Font';
import Icon from './Dumb/Icon';
import StickyHeader from './Dumb/Sticky/Header';
import AutocompLite from './Smart-ish/AutocompLite';
import type { AutocompLiteOption } from './Smart-ish/AutocompLite/interfaces';
import useAutocomplite from './Smart-ish/AutocompLite/useAutocomplite';
import DemoRenderer from './Demos';
import { callAll } from './utils';

import './App.css';

const mapper = (p: (typeof DEMOS_V2)[number]): AutocompLiteOption => ({
    ...p,
    full: `${p.label}, ${p.tag} `,
});

export default function App() {
    // useEffect(() => {
    //     imperativeStyles('#main')
    //         .color('#fff')
    //         .backgroundColor('#000')
    //         .filter('blur(2px)');
    // }, []);
    //

    const { toggleDemo, demos, clearDemos } = useDemos();
    const hasDemos = demos.length > 0;

    const {
        selected,
        liveMessage,
        filteredOptions,
        toggleOption,
        query,
        setQuery,
        setPopover,
        showPopover,
        clearSelection,
    } = useAutocomplite({
        places: DEMOS_V2,
        mapper,
        initialQuery: '',
        multi: true,
        initialSelectedIds: demos,
    });

    const onToggleOptionSetUrl = (option: AutocompLiteOption) => {
        toggleOption(option);
        if (demos.includes(option.id)) {
            demos.filter((i) => i === option.id).map((d) => toggleDemo(d));
            return;
        } else {
            toggleDemo(option.id);
        }
    };

    return (
        <>
            <aside id="aside"></aside>

            <main
                id="main"
                style={{
                    padding: 'var(--gap-3)',
                    minHeight: '100vh',
                    overflow: 'visible',
                }}
            >
                <StickyHeader height="200px" id="autocompLite-demos">
                    {({ isSticky }) => (
                        <>
                            <AutocompLite
                                placeholder={`Search ${DEMOS_V2.length} demos`}
                                id="app-autocompLite"
                                toggleOption={onToggleOptionSetUrl}
                                options={filteredOptions}
                                a11y={liveMessage ?? ''}
                                query={query}
                                setQuery={setQuery}
                                selected={selected}
                                label={isSticky ? '' : 'Browse demos'}
                                onToggle={() => setPopover((prev) => !prev)}
                                showPopover={
                                    showPopover && filteredOptions.length > 0
                                }
                                showChips
                                isSticky={isSticky}
                            >
                                {filteredOptions.length === 0 ? (
                                    <Alert
                                        style={{
                                            marginTop: 'var(--gap-2)',
                                        }}
                                    >
                                        <Font>No Demos match your search</Font>
                                    </Alert>
                                ) : null}
                            </AutocompLite>
                        </>
                    )}
                </StickyHeader>

                <br />
                <DemoRenderer demos={demos} />
            </main>
            {hasDemos && (
                <Button.Negative
                    isIcon
                    dangerous={{
                        padding: 0,
                        position: 'fixed',
                        bottom: 'var(--gap-3)',
                        right: 'var(--gap-3)',
                        borderRadius: '50%',
                        boxShadow: 'var(--shadow)',
                        border: 'var(--border)',
                    }}
                    onClick={callAll(clearSelection, clearDemos)}
                >
                    <Icon.X circle={false} size={52} />
                </Button.Negative>
            )}
        </>
    );
}
