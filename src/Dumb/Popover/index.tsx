import { type ReactNode, useMemo, useState } from 'react';

import { FocusScope } from '@react-aria/focus';
import { useKeyboard } from 'react-aria';
import Stick from 'react-stick';

import { moveFocusTo } from '../../utilities/focus';
import Button from '../Button';

import type { TldrProps } from './interfaces';

export default function Popover(props: TldrProps) {
    const {
        children,
        position = 'bottom left',
        caption,
        sameWidthCaption = false,
        autoFlipHorizontally = false,
        inline = true,
        autoFlipVertically = true,
        backdrop,
        id,
    } = props;

    const [isCaptionShown, setCaption] = useState<boolean>(false);
    const hideCaption = () => setCaption(false);
    const toggleCaption = () => setCaption((previous) => !previous);

    const triggerProps = useMemo(
        () => ({
            'aria-controls': id,
            id: `${id}-button`,
            'aria-expanded': isCaptionShown,
        }),
        [id, isCaptionShown],
    );
    const captionProps = useMemo(
        () => ({
            id,
            role: 'status',
            'aria-live': 'polite',
            'aria-relevant': 'additions text',
            hidden: !isCaptionShown,
        }),
        [id, isCaptionShown],
    );
    const { keyboardProps } = useKeyboard({
        onKeyDown: (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                hideCaption();
            }
        },
    });

    const node = caption({
        isCaptionShown,
        toggleCaption,
        captionProps,
        keyboardProps,
        onClose: () => moveFocusTo(`#${CSS.escape(id)}-button`),
    });
    return (
        <>
            {backdrop != undefined && isCaptionShown && (
                <div
                    style={{
                        position: 'fixed',
                        width: '100%',
                        height: '100%',
                        inset: 0,
                        zIndex: 1,
                        backgroundColor: backdrop,
                    }}
                />
            )}
            <Stick
                {...(inline && { inline })}
                autoFlipVertically={autoFlipVertically}
                autoFlipHorizontally={autoFlipHorizontally}
                sameWidth={sameWidthCaption}
                {...(isCaptionShown && { node })}
                position={position}
                onClickOutside={hideCaption}
            >
                {children({
                    isCaptionShown,
                    toggleCaption,
                    triggerProps,
                })}
            </Stick>
        </>
    );
}

Popover.Button = Button;

Popover.Trap = ({ children }: { children: ReactNode }) => (
    <FocusScope contain restoreFocus autoFocus>
        {children}
    </FocusScope>
);
