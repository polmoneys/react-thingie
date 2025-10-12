import Button from '../Dumb/Button';
import Card from '../Dumb/Card';
import Font from '../Dumb/Font';
import Popover from '../Dumb/Popover';
// import PopoverLite from '../Dumb/Popover/Lite';
import Shape from '../Dumb/Shape';
import GridTemplateColumns from '../Enlightment/GridTemplateColumns';

export default function PopoversGrid() {
    return (
        <>
            {/*<PopoverLite id="menu-test" label="Some cta">
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
            <br />*/}

            <GridTemplateColumns
                gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
                gap={{ xs: 'var(--gap-2)' }}
            >
                <Popover
                    id="popover-a"
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
                                maxWidth: 'min(300px,80vw)',
                                backgroundColor: 'var(--positive)',
                            }}
                            {...keyboardProps}
                        >
                            <Card.Title>
                                <Font.Bold>
                                    Erik Gunnar Asplund on Swedish Grace.
                                </Font.Bold>{' '}
                            </Card.Title>
                            <Card.Actions>
                                <Button
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
                                backgroundColor: 'var(--neutral)',
                            }}
                        >
                            <Card.Content>
                                <Font clamp={8}>
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
                                </Font>
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
                    id="popover-b"
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
                                maxWidth: '100%',
                                backgroundColor: 'var(--positive)',
                            }}
                            {...keyboardProps}
                        >
                            <Card.Title>
                                <Shape.Triangle />
                            </Card.Title>
                            <Card.Actions>
                                <Button
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
                                maxWidth: 'min(300px,80vw)',
                                backgroundColor: 'var(--grey)',
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
                                </Popover.Button>
                            </Card.Actions>
                        </Card>
                    )}
                </Popover>
            </GridTemplateColumns>
            <br />
        </>
    );
}
