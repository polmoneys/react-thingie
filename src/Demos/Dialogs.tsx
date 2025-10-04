import Dialog from '../Dialog';
import Actionsheet from '../Dialog/ActionSheet';
import Tray from '../Dialog/Tray';
import Button from '../Dumb/Button';
import Card from '../Dumb/Card';
import Group from '../Dumb/Group';
import Shape from '../Dumb/Shape';
import useURLDialogs from '../utilities/useURL';
import useURLLite from '../utilities/useURLLite';
import { callAll } from '../utils';

export default function DemoDialog() {
    const { onOpenTray, onOpenDialog, onOpenSheet, dialogs, onClose } =
        useURLDialogs();
    const isTrayOpen = dialogs === 'tray';
    const isDialogOpen = dialogs === 'dialog';
    const isSheetOpen = dialogs === 'sheet';

    const { state, onOpen, onClose: onClose2 } = useURLLite(['xoxo']);
    const isTrayOpen2 = state === 'xoxo';

    return (
        <>
            <Group.Row flexWrap="wrap">
                <Button onClick={() => onOpenDialog()}>Dialog open</Button>
                <Button onClick={() => onOpenTray()}>Tray open</Button>
                <Button onClick={() => onOpen('xoxo')}>Tray open 2</Button>

                <Actionsheet
                    trigger={({ isOpen }) => {
                        return (
                            <Button
                                type="button"
                                onClick={() => onOpenSheet()}
                                aria-expanded={isOpen}
                            >
                                Show action sheet
                            </Button>
                        );
                    }}
                    unTrigger={({ onClose: onCloseLocal }) => {
                        return (
                            <Button type="reset" onClick={onCloseLocal}>
                                Cancel
                            </Button>
                        );
                    }}
                    isOpen={isSheetOpen}
                    onClose={() => onClose()}
                >
                    <Button
                        className={'action-sheet-button'}
                        onClick={(e) => e.preventDefault()}
                    >
                        Action 1
                    </Button>
                    <Button
                        className={'action-sheet-button'}
                        onClick={(e) => e.preventDefault()}
                    >
                        Action 2
                    </Button>
                    <Button
                        className={'action-sheet-button'}
                        onClick={(e) => e.preventDefault()}
                    >
                        Action 3
                    </Button>
                </Actionsheet>
            </Group.Row>
            <br />

            <Dialog isOpen={isDialogOpen} onClose={() => onClose()}>
                <Card
                    component="div"
                    ratio="landscape"
                    dangerous={{ width: 'min(750px,80vw)' }}
                >
                    <Card.Title>Lorem ipsun dolor</Card.Title>
                    <Card.Content>
                        <Shape.Triangle />
                        <Shape.Triangle />
                        <Shape.Square />
                        <Shape.Circle />
                    </Card.Content>
                    <Card.Actions>
                        <Button onClick={() => onClose()}>Close</Button>{' '}
                    </Card.Actions>
                </Card>
            </Dialog>

            <Tray
                isOpen={isTrayOpen || isTrayOpen2}
                onClose={callAll(onClose, onClose2)}
            >
                <Card component="div">
                    <Card.Title>Lorem ipsun dolor</Card.Title>
                    <Card.Content>
                        <Shape.Triangle />
                        <Shape.Triangle />
                        <Shape.Square />
                        <Shape.Circle />
                        <Button onClick={callAll(onClose, onClose2)}>
                            On close
                        </Button>
                    </Card.Content>
                </Card>
            </Tray>
        </>
    );
}
