import { useState } from 'react';

import DemoAutocompLite from './Autocomplete/Demo';
import CardsGrid from './Card/Demo';
import DemoIcons from './Icon/Demo';
import DemoList from './List/Demo';
import PopoversGrid from './Popover/Demo';
import DemoPortal from './Portal/Demo';
import DemoRadio from './Radio/Demo';
import DemoTable from './Table/Demo';
import Button from './Button';
import Card from './Card';
import Dialog from './Dialog';
import Shape from './Shape';

import './App.css';

function App() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <aside id="aside"></aside>

            <main style={{ padding: 'var(--gap-3)', minHeight: '100vh' }}>
                <DemoAutocompLite />
                <br />
                <DemoIcons />
                <br />
                <DemoRadio />
                <DemoList />
                <DemoTable />
                <CardsGrid />
                <PopoversGrid />
                <br />
                <br />
                <DemoPortal />
                <br />
                <br />
                <Button onClick={() => setOpen(true)}>Dialog open</Button>
                {open && (
                    <Dialog onClose={() => setOpen(false)}>
                        <Card
                            component="div"
                            ratio="landscape"
                            dangerous={{ width: '60vw' }}
                        >
                            <Card.Title>Lorem ipsun dolor</Card.Title>
                            <Card.Content>
                                <Shape.Triangle />
                                <Shape.Triangle />
                                <Shape.Square />
                                <Shape.Circle />
                            </Card.Content>
                            <Card.Actions>
                                <Button onClick={() => setOpen(false)}>
                                    Close
                                </Button>{' '}
                            </Card.Actions>
                        </Card>
                    </Dialog>
                )}
            </main>
        </>
    );
}

export default App;
