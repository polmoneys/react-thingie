import { useState } from 'react';

import Button from '../Dumb/Button';
import Checkbox from '../Dumb/Checkbox';
import Font from '../Dumb/Font';
import IconAdd from '../Dumb/Icon/Icons/Add';
import IconX from '../Dumb/Icon/Icons/X';
import Membrane from '../Dumb/Membrane';
import Swipeable from '../Dumb/Membrane/Swipeable';
import Slot from '../Dumb/Slot';
import GridTemplateColumns from '../Inspired/GridTemplateColumns';
import type { LooseT } from '../interfaces';

export default function SwipeableDemo() {
    const [state, setState] =
        useState<LooseT<'pin' | 'delete' | 'default'>>('default');
    return (
        <>
            <Swipeable
                lock="x"
                touchAction="pan-x"
                classNames={{ root: 'theme', isSwiping: 'noise-scroll' }}
                onEnd={(summary) => {
                    if (summary.direction4 === 'LEFT') {
                        setState('pin');
                        return;
                    }
                    setState('delete');
                }}
            >
                {({ isSwiping }) => (
                    <Slot
                        {...(!isSwiping &&
                            state === 'delete' && {
                                startWidth: '69px',
                                start: (
                                    <Button.Negative
                                        isIcon
                                        onClick={() => {
                                            console.log(
                                                'Are u sure u wanna delete me ?',
                                            );
                                            setState('default');
                                        }}
                                    >
                                        <IconX size={28} />
                                    </Button.Negative>
                                ),
                            })}
                        {...(!isSwiping &&
                            state === 'pin' && {
                                endWidth: '69px',
                                end: (
                                    <Button.Positive
                                        isIcon
                                        onClick={() => {
                                            console.log(
                                                'Are u sure u wanna pin me ?',
                                            );
                                            setState('default');
                                        }}
                                    >
                                        <IconAdd size={28} />
                                    </Button.Positive>
                                ),
                            })}
                        dangerous={{
                            gap: 'var(--gap-3)!important',
                        }}
                    >
                        <GridTemplateColumns
                            gap={{ xs: 'var(--gap-3)' }}
                            gridTemplateColumns={{
                                xs: 'var(--min-height) 1fr',
                            }}
                            dangerous={{ alignItems: 'center' }}
                        >
                            <Checkbox />
                            <Font.Bold clamp={1}>Task description </Font.Bold>
                        </GridTemplateColumns>
                    </Slot>
                )}
            </Swipeable>
            <br />

            <Membrane
                className="theme negative"
                label="joystick"
                // onMove={(dataMove) => console.log({ dataMove })}
                // onStart={(dataStart) => console.log({ dataStart })}
                onEnd={({ summary: { direction } }) => {
                    if (direction.endsWith('LEFT')) {
                        setState('pin');
                        return;
                    } else {
                        setState('delete');
                        return;
                    }
                }}
            />
            <br />
        </>
    );
}
