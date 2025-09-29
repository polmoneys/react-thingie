import type { CSSProperties } from 'react';

import Button from '../Button';
import Card from '../Card';
import Font from '../Font';
import Grid from '../Grid';
import Shape from '../Shape';

import PopoverLite from './Lite';
import Popover from '.';

export default function PopoversGrid() {
    return (
        <>
            <br />

            <PopoverLite id="menu-test" label="Some cta">
                {() => (
                    <>
                        <Button onClick={() => console.log('a')}>
                            Action A
                        </Button>
                        <Button onClick={() => console.log('b')}>
                            Action B
                        </Button>
                        <Button onClick={() => console.log('c')}>
                            Action C
                        </Button>
                    </>
                )}
            </PopoverLite>
            <br />
            <br />
            <br />
            <br />

            <Grid width="28em">
                <Popover
                    id="ttttt"
                    backdrop="rgba(0,0,0,.77)"
                    caption={({
                        onClose,
                        toggleCaption,
                        captionProps,
                        keyboardProps,
                    }) => (
                        <Card
                            component="article"
                            {...captionProps}
                            dangerous={{
                                backgroundColor: 'var(--nemesis)',
                                color: 'var(--white)',
                            }}
                            {...keyboardProps}
                        >
                            <Card.Title>
                                <h2>
                                    Erik Gunnar Asplund on **Swedish Grace**.
                                </h2>
                            </Card.Title>
                            <Card.Content>
                                <p>
                                    Our requirements are more modest but at the
                                    same time more responsible: buildings,
                                    furniture, drinking glasses may well be
                                    consumer items that we can destroy without
                                    regret after they have served for some short
                                    or long period, but while we use them we
                                    expect them to full fill their role and
                                    serve us perfectly, so perfectly that we can
                                    also derive aesthetic enjoyment from
                                    observing them in use.
                                </p>
                            </Card.Content>
                            <Card.Actions>
                                <Button
                                    color="var(--nemesis)"
                                    autoFocus
                                    onClick={() => {
                                        toggleCaption();
                                        onClose();
                                    }}
                                >
                                    Close
                                </Button>
                            </Card.Actions>
                        </Card>
                    )}
                >
                    {({ toggleCaption, triggerProps }) => (
                        <Card
                            component="article"
                            dangerous={{
                                // maxHeight: '530px',
                                backgroundColor: 'var(--accent)',
                            }}
                        >
                            <Card.Title>
                                <Font.Bold component="h2" size="xl">
                                    Titlex
                                </Font.Bold>
                            </Card.Title>
                            <Card.Content>
                                <p
                                    className="clamp"
                                    style={
                                        {
                                            '--clamp-lines': 4,
                                        } as CSSProperties
                                    }
                                >
                                    Our requirements are more modest but at the
                                    same time more responsible: buildings,
                                    furniture, drinking glasses may well be
                                    consumer items that we can destroy without
                                    regret after they have served for some short
                                    or long period, but while we use them we
                                    expect them to full fill their role and
                                    serve us perfectly, so perfectly that we can
                                    also derive aesthetic enjoyment from
                                    observing them in use. Erik Gunnar Asplund
                                    on **Swedish Grace**.
                                </p>
                            </Card.Content>
                            <Card.Actions>
                                <Popover.Button
                                    {...triggerProps}
                                    onClick={() => toggleCaption()}
                                >
                                    Read More
                                </Popover.Button>
                            </Card.Actions>
                        </Card>
                    )}
                </Popover>

                <Popover
                    id="ttttt333"
                    backdrop="rgba(0,0,0,.1)"
                    caption={({
                        onClose,
                        toggleCaption,
                        captionProps,
                        keyboardProps,
                    }) => (
                        <Card
                            component="div"
                            {...captionProps}
                            dangerous={{
                                maxWidth: '300px',
                                backgroundColor: 'var(--nemesis)',
                                color: 'var(--white)',
                            }}
                            {...keyboardProps}
                        >
                            <Card.Title>
                                <p>Erik Gunnar Asplund on **Swedish Grace**.</p>
                            </Card.Title>
                            <Card.Actions>
                                <Button
                                    color="var(--nemesis)"
                                    autoFocus
                                    onClick={() => {
                                        toggleCaption();
                                        onClose();
                                    }}
                                >
                                    Close
                                </Button>
                            </Card.Actions>
                        </Card>
                    )}
                >
                    {({ toggleCaption, triggerProps }) => (
                        <Card
                            ratio="landscape"
                            component="article"
                            dangerous={{
                                // width: '330px!important',
                                // maxWidth: '600px',
                                backgroundColor: 'var(--accent)',
                            }}
                        >
                            <Card.Content>
                                <p
                                    className="clamp"
                                    style={
                                        { '--clamp-lines': 4 } as CSSProperties
                                    }
                                >
                                    Our requirements are more modest but at the
                                    same time more responsible: buildings,
                                    furniture, drinking glasses may well be
                                    consumer items that we can destroy without
                                    regret after they have served for some short
                                    or long period, but while we use them we
                                    expect them to full fill their role and
                                    serve us perfectly, so perfectly that we can
                                    also derive aesthetic enjoyment from
                                    observing them in use. Erik Gunnar Asplund
                                    on **Swedish Grace**.
                                </p>
                            </Card.Content>
                            <Card.Actions>
                                <Popover.Button
                                    {...triggerProps}
                                    onClick={() => toggleCaption()}
                                >
                                    Read More
                                </Popover.Button>{' '}
                            </Card.Actions>
                        </Card>
                    )}
                </Popover>

                <Popover
                    id="ttttt"
                    backdrop="rgba(0,0,0,.1)"
                    caption={({
                        onClose,
                        toggleCaption,
                        captionProps,
                        keyboardProps,
                    }) => (
                        <Card
                            component="div"
                            {...captionProps}
                            dangerous={{
                                maxWidth: '300px',
                                backgroundColor: 'var(--nemesis)',
                                color: 'var(--white)',
                            }}
                            {...keyboardProps}
                        >
                            <Card.Title>
                                <p>Erik Gunnar Asplund on **Swedish Grace**.</p>
                            </Card.Title>
                            <Card.Actions>
                                <Button
                                    color="var(--nemesis)"
                                    autoFocus
                                    onClick={() => {
                                        toggleCaption();
                                        onClose();
                                    }}
                                >
                                    Close
                                </Button>
                            </Card.Actions>
                        </Card>
                    )}
                >
                    {({ toggleCaption, triggerProps }) => (
                        <Card
                            component="article"
                            dangerous={{
                                backgroundColor: 'var(--nemesis)',
                                color: 'var(--white)',
                            }}
                        >
                            <Card.Content>
                                <Shape.Square />
                            </Card.Content>
                            <Card.Actions>
                                <Popover.Button
                                    {...triggerProps}
                                    onClick={() => toggleCaption()}
                                >
                                    Read More
                                </Popover.Button>{' '}
                            </Card.Actions>
                        </Card>
                    )}
                </Popover>
            </Grid>
        </>
    );
}
