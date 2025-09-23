import { useState } from 'react';

import Button from '../Button';
import Card from '../Card';
import Dialog from '../Dialog';
import Shape from '../Shape';

import Actionsheet from './ActionSheet';
import Tray from './Tray';

export default function DemoDialog() {
    const [open, setOpen] = useState(false);
    const [tray, setTray] = useState(false);
    const [openAS, setOpenAS] = useState(false);

    return (
        <>
            <div className="row gap sm">
                <Button onClick={() => setOpen(true)}>Dialog open</Button>
                <Button onClick={() => setTray(true)}>Tray open</Button>
                <Actionsheet
                    trigger={({ isOpen }) => {
                        return (
                            <Button
                                type="button"
                                onClick={() => setOpenAS(true)}
                                aria-expanded={isOpen}
                            >
                                Show action sheet
                            </Button>
                        );
                    }}
                    unTrigger={({ onClose }) => {
                        return (
                            <Button type="reset" onClick={onClose}>
                                Cancel
                            </Button>
                        );
                    }}
                    isOpen={openAS}
                    onOpenChange={() => setOpenAS((prev) => !prev)}
                >
                    <Button className={'action-sheet-button'}>Action 1</Button>
                    <Button className={'action-sheet-button'}>Action 2</Button>
                    <Button className={'action-sheet-button'}>Action 3</Button>
                </Actionsheet>
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
