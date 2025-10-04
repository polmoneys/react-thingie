import useDemos from './Demos/useURLDemos';
import AutocompLite from './Dumb/Autocomplete';
import DemoRenderer from './Demos';

import './App.css';

const DEMOS_V1 = [
    'AutoCompLite',
    'Card',
    'DatePicker',
    'Dialog',
    'Icon',
    'List',
    'Menu',
    'Popover',
    'Portal',
    'Radio',
    'Stream',
    'Table',
];

function App() {
    // useEffect(() => {
    //     style('#main')
    //         .color('#fff')
    //         .backgroundColor('#000')
    //         .filter('blur(2px)');
    // }, []);
    //

    const { toggleDemo, demos } = useDemos();

    return (
        <>
            <aside id="aside" className="col sm gap"></aside>

            <main
                id="main"
                style={{
                    padding: 'var(--gap-3)',
                    minHeight: '100vh',
                }}
            >
                <AutocompLite
                    inputProps={{
                        placeholder: `Search ${DEMOS_V1.length} demos`,
                    }}
                    options={DEMOS_V1}
                    value={demos}
                    onChange={(next) => {
                        // first
                        if (demos.length === 0) {
                            next.map((d) => toggleDemo(d));
                            return;
                        }
                        // remove
                        if (demos.length > next.length) {
                            demos
                                .filter((i) => !next.includes(i))
                                .map((d) => toggleDemo(d));
                            return;
                        }
                        // add
                        next.filter((i) => !demos.includes(i)).map((d) =>
                            toggleDemo(d),
                        );
                    }}
                    limit={3}
                    id="search-demos"
                />
                <br />
                <DemoRenderer demos={demos} />
            </main>
        </>
    );
}

export default App;
