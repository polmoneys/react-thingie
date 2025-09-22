import { useState } from 'react';

import Button from '../Button';
import Card from '../Card';
import Dialog from '../Dialog';
import Shape from '../Shape';

import Tray from './Tray';

export default function DemoDialog() {
    const [open, setOpen] = useState(false);
    const [tray, setTray] = useState(false);

    return (
        <>
            <div className="row gap sm">
                <Button onClick={() => setOpen(true)}>Dialog open</Button>
                <Button onClick={() => setTray(true)}>Tray open</Button>
            </div>

            {open && (
                <Dialog onClose={() => setOpen(false)}>
                    <Card component="div" ratio="landscape">
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

            {tray && (
                <Tray onClose={() => setTray(false)}>
                    <Card component="div">
                        <Card.Title>Lorem ipsun dolor</Card.Title>
                        <Card.Content>
                            <Shape.Triangle />
                            <Shape.Triangle />
                            <Shape.Square />
                            <Shape.Circle />
                        </Card.Content>
                    </Card>
                </Tray>
            )}
        </>
    );
}
