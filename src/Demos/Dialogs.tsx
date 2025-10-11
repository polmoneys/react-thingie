import Dialog from '../Dialog';
import Actionsheet from '../Dialog/ActionSheet';
import Tray from '../Dialog/Tray';
import Button from '../Dumb/Button';
import Card from '../Dumb/Card';
import Font from '../Dumb/Font';
import Group from '../Dumb/Group';
import Icon from '../Dumb/Icon';
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
                    <Button onClick={(e) => e.preventDefault()}>
                        Action 1
                    </Button>
                    <Button onClick={(e) => e.preventDefault()}>
                        Action 2
                    </Button>
                    <Button onClick={(e) => e.preventDefault()}>
                        Action 3
                    </Button>
                </Actionsheet>
            </Group.Row>
            <br />

            <Dialog isOpen={isDialogOpen} onClose={() => onClose()}>
                <Card
                    component="div"
                    ratio="landscape"
                    dangerous={{ width: 'min(750px,92vw)' }}
                >
                    <Card.Title
                        dangerous={{
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: 'var(--border)',
                            minHeight: 'var(--min-height)',
                            padding: '0 var(--gap-2) 0 var(--gap-3)',
                        }}
                    >
                        <Font>Lorem ipsun dolor</Font>
                        <Button.Icon
                            className="ml-a"
                            onClick={() => onClose()}
                            isText
                        >
                            <Icon.X size={36} circle={false} />
                        </Button.Icon>
                    </Card.Title>
                    <Card.Content
                        dangerous={{
                            placeContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Shape.Triangle size={50} />
                    </Card.Content>
                    <Card.Actions
                        dangerous={{
                            display: 'flex',
                            alignItems: 'center',
                            borderTop: 'var(--border)',
                            minHeight: 'var(--min-height)',
                            justifyContent: 'flex-end',
                            padding: 'var(--gap-2) var(--gap-4) var(--gap-2)',
                        }}
                    >
                        <Button onClick={() => onClose()}>Close</Button>
                    </Card.Actions>
                </Card>
            </Dialog>

            <Tray
                isOpen={isTrayOpen || isTrayOpen2}
                onClose={callAll(onClose, onClose2)}
            >
                <Card component="div" dangerous={{ width: 'min(750px,92vw)' }}>
                    <Card.Title
                        dangerous={{
                            display: 'flex',
                            placeContent: 'center',
                            borderBottom: 'var(--border)',
                            height: 'var(--min-height)',
                        }}
                    >
                        <Font>Lorem ipsun dolor</Font>
                    </Card.Title>
                    <Card.Content
                        dangerous={{
                            placeContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Shape.Square size={50} />
                    </Card.Content>
                    <Card.Actions
                        className="mt-a"
                        dangerous={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Button stretch onClick={callAll(onClose, onClose2)}>
                            Close
                        </Button>
                    </Card.Actions>
                </Card>
            </Tray>
        </>
    );
}
