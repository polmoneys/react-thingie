import { useState } from 'react';

import useDemos from './Demos/useURLDemos';
import Alert from './Dumb/Alert';
import AutocompLite from './Dumb/Autocomplete';
import Font from './Dumb/Font';
import StickyHeader from './Dumb/Sticky/Header';
import { Timer } from './utilities/timer';
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
    'WebWorker',
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

    const [showAlert, setAlert] = useState(true);

    new Timer(() => setAlert(false), 2000);

    return (
        <>
            <aside id="aside" className="col sm gap"></aside>

            <main
                id="main"
                style={{
                    padding: 'var(--gap-3)',
                    minHeight: '100vh',
                    overflow: 'visible',
                }}
            >
                {showAlert && (
                    <>
                        <Alert
                            mood="positive"
                            style={{ width: 'fit-content', margin: '0 auto' }}
                        >
                            <Font.Bold>
                                {DEMOS_V1.length} & growing :)
                            </Font.Bold>
                        </Alert>
                        <br />
                    </>
                )}
                <StickyHeader height="130px">
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
                        dangerous={{
                            boxShadow: 'var(--shadow)',
                        }}
                    />
                </StickyHeader>
                <br />
                <DemoRenderer demos={demos} />
            </main>
        </>
    );
}

export default App;
