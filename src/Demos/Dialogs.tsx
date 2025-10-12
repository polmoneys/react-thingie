import Button from '../Dumb/Button';
import Font from '../Dumb/Font';
import Group from '../Dumb/Group';
import Icon from '../Dumb/Icon';
import Shape from '../Dumb/Shape';
import Dialog from '../Smart-ish/Dialog';
import Actionsheet from '../Smart-ish/Dialog/ActionSheet';
import Tray from '../Smart-ish/Dialog/Tray';
import useURLDialogs from '../utilities/useURL';
import useURLLite from '../utilities/useURLLite';
import { callAll } from '../utils';

export default function DemoDialog() {
    const { onOpenTray, onOpenDialog, onOpenSheet, dialogs, onClose } =
        useURLDialogs();
    const isTrayOpen = dialogs === 'tray';
    const isDialogOpen = dialogs === 'dialog';
    const isSheetOpen = dialogs === 'sheet';

    const { state, onOpen, onClose: onClose2 } = useURLLite(['tray2']);
    const isTrayOpen2 = state === 'tray2';

    return (
        <>
            <Group.Row flexWrap="wrap">
                <Button onClick={() => onOpenDialog()}>Dialog open</Button>
                <Button onClick={() => onOpenTray()}>Tray open</Button>
                <Button onClick={() => onOpen('tray2')}>Tray open 2</Button>
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
                    <Button onClick={(event) => event.preventDefault()}>
                        Action 1
                    </Button>
                    <Button onClick={(event) => event.preventDefault()}>
                        Action 2
                    </Button>
                    <Button onClick={(event) => event.preventDefault()}>
                        Action 3
                    </Button>
                </Actionsheet>
            </Group.Row>

            <Dialog isOpen={isDialogOpen} onClose={() => onClose()}>
                <Dialog.Title
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
                </Dialog.Title>
                <Dialog.Content
                    dangerous={{
                        placeContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Shape.Triangle size={50} />
                </Dialog.Content>
                <Dialog.Actions
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
                </Dialog.Actions>
            </Dialog>

            <Tray
                isOpen={isTrayOpen || isTrayOpen2}
                onClose={callAll(onClose, onClose2)}
            >
                <Dialog.Title
                    dangerous={{
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: 'var(--border)',
                        minHeight: 'var(--min-height)',
                        padding: '0 var(--gap-2) 0 var(--gap-3)',
                    }}
                >
                    <Font>Lorem ipsun dolor</Font>
                </Dialog.Title>
                <Dialog.Content
                    dangerous={{
                        placeContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Shape.Square size={50} />
                </Dialog.Content>
                <Dialog.Actions
                    className="mt-a"
                    dangerous={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Button stretch onClick={callAll(onClose, onClose2)}>
                        Close
                    </Button>
                </Dialog.Actions>
            </Tray>
        </>
    );
}
