import Button from '../Button';
import Font from '../Font';
import Group from '../Group';
import PopoverLite from '../Popover/Lite';
import { callAll } from '../utils';

import useMenu from './useMenu';

interface SettingsMenu {
    account: string;
    services: string;
    contact: string;
}
export default function DemoMenu() {
    const [openMenu, dispatchMenu] = useMenu<keyof SettingsMenu>(null, {
        onOpen: (key) => console.log('Opened menu:', key),
        onClose: (key) => console.log('Closed menu:', key),
    });
    return (
        <>
            <PopoverLite
                id="test-menu"
                label={!openMenu ? 'Settings' : `Viewing: ${openMenu}`}
            >
                {({ onClose }) => (
                    <>
                        <Button
                            onClick={callAll(
                                () => dispatchMenu('account'),
                                onClose,
                            )}
                        >
                            Account
                        </Button>
                        <Button
                            onClick={callAll(
                                () => dispatchMenu('services'),
                                onClose,
                            )}
                        >
                            Services
                        </Button>
                        <Button
                            onClick={callAll(
                                () => dispatchMenu('contact'),
                                onClose,
                            )}
                        >
                            Contact
                        </Button>
                    </>
                )}
            </PopoverLite>
            <Group.Col
                component="div"
                dangerous={{
                    maxWidth: 'min(300px,60vw)',
                    backgroundColor: 'var(--accent)',
                    borderRadius: 'var(--border-radius)',
                    padding: 'var(--gap-3)',
                }}
            >
                {openMenu ? (
                    <>
                        {openMenu === 'account' && (
                            <Font.Bold>settings: Account </Font.Bold>
                        )}
                        {openMenu === 'services' && (
                            <Font.Bold>settings: Services </Font.Bold>
                        )}
                        {openMenu === 'contact' && (
                            <Font.Bold>settings: Contact </Font.Bold>
                        )}
                    </>
                ) : (
                    <Font.Bold>No menu selected</Font.Bold>
                )}
            </Group.Col>
        </>
    );
}
