import DemoAutocompLite from './Autocomplete/Demo';
import DemoMultiple from './Autocomplete/DemoMultiple';
import DemoCards from './Card/Demo';
import DemoDialog from './Dialog/Demo';
import DemoIcons from './Icon/Demo';
import DemoList from './List/Demo';
import DemoMenu from './Menu/Demo';
import DemoPopovers from './Popover/Demo';
import DemoPortal from './Portal/Demo';
import DemoRadio from './Radio/Demo';
import DemoTable from './Table/Demo';

import './App.css';

function App() {
    return (
        <>
            <aside id="aside" className="col sm gap"></aside>

            <main style={{ padding: 'var(--gap-3)', minHeight: '100vh' }}>
                <DemoMultiple />
                <br />
                <DemoAutocompLite />
                <br />
                <DemoIcons />
                <br />
                <DemoRadio />
                <DemoList />
                <DemoTable />
                <DemoCards />
                <DemoPopovers />
                <br />
                <DemoPortal />
                <br />
                <DemoMenu />
                <br />
                <DemoDialog />
                <br />
            </main>
        </>
    );
}

export default App;
